import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const { description } = await req.json();
    const client = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: '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', // Se mantiene intacto como lo tenías
    });

    // Añadimos el corazón del control estructural de tus 6 secciones
    const systemPrompt = `Eres un ingeniero de software experto en diseño de producto y automatizaciones. 
Tu única tarea es generar una especificación técnica de producto basada en la idea del usuario.

DEBES organizar la respuesta ÚNICA, ESTRICTA Y OBLIGATORIAMENTE en las siguientes 6 secciones en español, usando exactamente estos títulos en Markdown:

SECCIÓN 1 — Visión del producto
SECCIÓN 2 — Usuarios y casos de uso
SECCIÓN 3 — Funcionalidades
SECCIÓN 4 — Flujos de usuario
SECCIÓN 5 — Arquitectura
SECCIÓN 6 — Requisitos no funcionales

REGLAS CRÍTICAS:
- No agregues introducciones, ni conclusiones, ni roadmaps, ni herramientas, ni ninguna sección extra o título fuera de estas 6 secciones.
- Usa tablas, listas y formato Markdown limpio dentro de cada sección para que el diseño sea profesional y técnico.
- Sé específico, técnico y detallado adaptándote al negocio que describa el usuario.`;

    const stream = await client.chat.completions.create({
      model: 'openrouter/free',
      // Aquí inyectamos el rol del sistema junto con la descripción del usuario
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: description }
      ],
      max_tokens: 2048, // Lo subimos un poco para que no se corten las 6 secciones al generar
      temperature: 0.4, // Un poco más bajo para asegurar que siga el formato estrictamente
      stream: true,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text =
            typeof chunk === 'string'
              ? chunk
              : (chunk?.choices?.[0]?.delta?.content ?? '');
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
        controller.close();
      },
    });

    return new NextResponse(readable, {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Unknown error' },
      { status: 500 },
    );
  }
}
guarda este contenido como project-spec.md en la raiz del proyecto Plantilla Spec-First para Claude
SECCIÓN 1 — Visión del producto
Tu visión:
AI Spec Builder es una herramienta web que transforma la descripción de cualquier idea de producto en una especificación técnica lista para compartir con desarrolladores, eliminando la barrera entre la visión del emprendedor y la ejecución técnica.
SECCIÓN 2 — Usuarios y casos de uso
Tus usuarios y casos de uso:
Aquí los casos de uso principales para ese perfil:
1.    Generar una spec desde cero — El emprendedor describe su idea en lenguaje simple y obtiene una especificación técnica estructurada lista para entregar a un desarrollador o agencia.
2.    Solicitar cotizaciones — Adjunta la spec a un proceso de contratación para que los desarrolladores entiendan el alcance y puedan estimar costos con precisión.
3.    Validar el alcance del producto — Revisa la spec para entender qué tan compleja es su idea antes de comprometer tiempo o dinero.
4.    Iterar sobre la idea — Modifica la descripción inicial y regenera la spec para explorar distintas versiones o funcionalidades del producto.
SECCIÓN 3 — Funcionalidades
Módulo de facturación:
●    El sistema calcula el total automáticamente.
●    El usuario puede generar una factura en PDF.
●    El usuario puede marcar facturas como pagadas.
Tus funcionalidades:
Aquí las funcionalidades organizadas por área:
________________________________________
Input
•    El usuario puede describir su idea de producto en lenguaje natural, sin tecnicismos.
•    El usuario puede indicar el tipo de producto (web app, mobile app, herramienta interna, etc.).
•    El usuario puede especificar su audiencia objetivo y el problema que resuelve.
•    El sistema permite ingresar el input desde un formulario simple y guiado.
________________________________________
Output
•    El sistema genera una especificación técnica completa y estructurada a partir del input.
•    El usuario puede descargar la spec en formato PDF o Word para compartirla.
•    El usuario puede copiar la spec directamente al portapapeles.
•    El sistema presenta la spec organizada en secciones claras: visión, funcionalidades, stack sugerido, casos de uso y criterios de aceptación.
________________________________________
Estados
•    El usuario puede guardar un borrador de su idea antes de generar la spec.
•    El usuario puede regenerar la spec con ajustes sin perder la versión anterior.
•    El sistema permite al usuario ver el historial de specs generadas en su sesión.
•    El usuario puede marcar una spec como "lista para compartir" cuando esté conforme.
SECCIÓN 4 — Flujos de usuario
Tus flujos principales:
Flujo principal
1. Entrada a la app
•    El usuario abre AI Spec Builder en el navegador.
•    El sistema muestra una pantalla de bienvenida con una breve explicación y un botón de inicio.
2. Completar el formulario guiado
•    El usuario responde 3–4 preguntas clave: nombre del producto, problema que resuelve, tipo de producto y audiencia objetivo.
•    El sistema muestra un indicador de progreso y valida que los campos mínimos estén completos antes de continuar.
3. Generación de la spec
•    El usuario hace clic en "Generar especificación".
•    El sistema envía el input a la IA y muestra un estado de carga con un mensaje motivador ("Estamos construyendo tu spec...").
•    La spec aparece progresivamente en pantalla a medida que se genera.
4. Revisión
•    El usuario lee la spec organizada por secciones.
•    El usuario puede editar secciones manualmente o pedir regenerar una sección específica.
5. Exportación
•    El usuario descarga la spec en PDF o Word, o la copia al portapapeles.
•    El sistema marca la spec como "lista para compartir".
________________________________________
Flujos de error
Situación    Qué hace el sistema
El formulario está incompleto    Resalta los campos faltantes y bloquea el avance
La IA tarda demasiado    Muestra un mensaje de espera y ofrece reintentar
La generación falla    Muestra un error amigable y conserva el input del usuario
La descarga falla    Ofrece copiar al portapapeles como alternativa
________________________________________
SECCIÓN 5 — Arquitectura
Tu arquitectura:
Arquitectura Técnica
Stack
•    Frontend: Next.js 16 + React + Tailwind CSS
•    Backend: API Routes de Next.js (serverless)
•    IA: Anthropic SDK conectado a Claude
•    Deploy: Vercel
________________________________________
Decisiones clave
•    Al usar API Routes de Next.js, no se necesita un servidor separado — el backend vive dentro del mismo proyecto.
•    Claude recibe el input del formulario y devuelve la spec en streaming para que el usuario vea el resultado progresivamente.
•    Todo el estado de la sesión se maneja en el cliente con React, sin base de datos en esta versión inicial.

Arquitectura Técnica
Stack
•    Frontend: Next.js 16 + React + Tailwind CSS
•    Backend: API Routes de Next.js (serverless)
•    IA: Anthropic SDK conectado a Claude
•    Deploy: Vercel
________________________________________
Decisiones clave
•    Al usar API Routes de Next.js, no se necesita un servidor separado — el backend vive dentro del mismo proyecto.
•    Claude recibe el input del formulario y devuelve la spec en streaming para que el usuario vea el resultado progresivamente.
•    Todo el estado de la sesión se maneja en el cliente con React, sin base de datos en esta versión inicial.

SECCIÓN 6 — Requisitos no funcionales
Tus requisitos:
Rendimiento
•    La spec debe comenzar a aparecer en pantalla en menos de 2 segundos desde que el usuario hace clic en "Generar" (gracias al streaming).
•    El formulario debe ser completamente interactivo desde la primera carga, sin bloqueos.
•    La app debe funcionar bien en conexiones lentas — el streaming ayuda porque el usuario ve progreso inmediato.
Seguridad
•    La API key de Anthropic nunca se expone al cliente — vive solo en variables de entorno del servidor (process.env).
•    El input del usuario se valida en la API Route antes de enviarse a Claude, para evitar prompts maliciosos o vacíos.
•    No se almacena ningún dato del usuario en esta versión — sin base de datos, sin logs de contenido.
Accesibilidad
•    El formulario debe ser navegable por teclado completo (Tab, Enter, Escape).
•    Los estados de carga y error deben anunciarse con aria-live para lectores de pantalla.
•    El contraste de colores debe cumplir WCAG AA como mínimo.
•    La app debe funcionar en los navegadores principales: Chrome, Firefox, Safari y Edge.
________________________________________
Fuera del alcance — lo que NO vamos a construir
Puedes hacer clic en cualquier ítem de la columna verde para profundizar en su implementación.
La decisión más importante aquí es la de no tener base de datos ni login en v1. Eso elimina semanas de trabajo (autenticación, manejo de sesiones, migraciones, seguridad de datos) y permite lanzar un producto funcional mucho antes. El historial vive en memoria de sesión — si el usuario cierra el navegador, se pierde. Eso es aceptable para una primera versión.
Todo lo de la columna derecha son candidatos naturales para una v2, pero incluirlos ahora mataría el momentum antes del primer lanzamiento. 
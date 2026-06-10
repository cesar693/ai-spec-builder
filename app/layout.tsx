import './globals.css';

export const metadata = {
  title: 'AI Spec Builder',
  description: 'Generate technical specifications from product ideas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Este script fuerza al navegador a activar Tailwind de inmediato */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-900 text-slate-100 min-h-screen flex items-center justify-center p-4">
        {children}
      </body>
    </html>
  );
}

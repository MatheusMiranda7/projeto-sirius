import type { Metadata } from 'next';
import { Manrope, Inter } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Project Sirius | Experiência Imersiva em Locação de Mesa Posta',
  description:
    'Plataforma SaaS cinematográfica para locação de pratos, talheres, taças e composições exclusivas de mesa posta para eventos memoráveis.',
  keywords: [
    'mesa posta',
    'locação de louças',
    'aluguel de talheres',
    'taças de cristal',
    'eventos de luxo',
    'casamento',
    'Project Sirius'
  ],
  openGraph: {
    title: 'Project Sirius | Locação Cinematográfica de Mesa Posta',
    description: 'Nós não vendemos pratos. Nós vendemos momentos e celebrações memoráveis.',
    type: 'website',
    locale: 'pt_BR'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0b0d] text-[#f7f7f4] font-sans selection:bg-[#c6a56a]/30 selection:text-[#f7f7f4]">
        {children}
      </body>
    </html>
  );
}

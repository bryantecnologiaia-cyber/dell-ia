import type {Metadata} from 'next';
import {Montserrat, Inter} from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Obsidian Cinema | Entrar na Sala',
  description: 'Acesse a experiência cinematográfica definitiva. Portal de login com elementos clássicos de cinema, película 35mm e iluminação de projetor.',
  openGraph: {
    title: 'Obsidian Cinema | Entrar na Sala',
    description: 'Acesse a experiência cinematográfica definitiva.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Obsidian Cinema | Entrar na Sala',
    description: 'Acesse a experiência cinematográfica definitiva.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="bg-[#0B0B0F] text-[#F4F4F6] font-sans antialiased overflow-x-hidden selection:bg-[#FF6B00] selection:text-[#0B0B0F]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

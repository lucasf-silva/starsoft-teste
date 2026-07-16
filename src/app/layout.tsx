import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { StoreProvider } from '@/components/providers/StoreProvider';
import './globals.scss';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Starsoft',
  description: 'Uma plataforma de compras de NFTs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable}`}>
      <body>
        <StoreProvider>
          <QueryProvider>{children}</QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

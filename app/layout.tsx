import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/components/toast-provider';

export const metadata: Metadata = {
  title: 'Pousada Viva Mar | Channel Manager',
  description: 'Plataforma de operação hoteleira da Pousada Viva Mar.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SessionProvider from '@/components/SessionProvider';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Bilogicons — Free Biological SVG Icon Library',
  description: 'Download and share biological SVG icons for scientific figures. Cells, DNA, Drosophila, Mosquito, arrows, and more. Free for researchers.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - 60px)' }}>{children}</main>
          <footer className="footer">
            © 2024 Bilogicons · Free Biological SVG Icons for Scientists · Built for Research
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}

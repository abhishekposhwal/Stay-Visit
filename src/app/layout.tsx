
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { WishlistProvider } from '@/context/WishlistProvider';
import { MobileFooterNav } from '@/components/layout/MobileFooterNav';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: 'StayVisit',
  description: 'Find your next stay with AI-powered insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased bg-background font-body", inter.variable, playfairDisplay.variable)}>
        <AuthProvider>
          <WishlistProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-grow pb-24 md:pb-0">{children}</main>
              <Footer />
            </div>
            <MobileFooterNav />
            <Toaster />
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

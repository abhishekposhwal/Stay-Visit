
'use client';

import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { WishlistProvider } from '@/context/WishlistProvider';
import { MobileFooterNav } from '@/components/layout/MobileFooterNav';
import './globals.css';
import { SearchBar } from '@/components/layout/SearchBar';
import { AuthProvider } from '@/context/AuthProvider';
import { usePathname } from 'next/navigation';
import { Bubbles } from '@/components/ui/bubbles';


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

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSearchBar = pathname !== '/inbox';

  return (
    <AuthProvider>
      <WishlistProvider>
        <div className="flex min-h-screen flex-col relative z-10">
          <Navbar />
          {showSearchBar && (
            <div className="sticky top-16 z-40 py-4">
              <SearchBar />
            </div>
          )}
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <MobileFooterNav />
        <Toaster />
      </WishlistProvider>
    </AuthProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>StayVisit</title>
        <meta name="description" content="Find your next stay with AI-powered insights." />
      </head>
      <body className={cn("antialiased bg-background font-body", inter.variable, playfairDisplay.variable)}>
        <Bubbles />
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}

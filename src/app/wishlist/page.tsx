"use client";

import { useWishlist } from '@/context/WishlistContext';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-6">My Wishlist</h1>
        {wishlist.length > 0 ? (
          <ListingGrid properties={wishlist} />
        ) : (
          <div className="text-center py-16 border-dashed border-2 rounded-lg">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-6 text-xl font-semibold">Your wishlist is empty</h2>
            <p className="mt-2 text-muted-foreground">
              Start exploring and add your favorite finds by clicking the heart icon.
            </p>
            <Button asChild className="mt-6">
              <Link href="/">Start Exploring</Link>
            </Button>
          </div>
        )}
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}


'use client';

import { useWishlist } from '@/context/WishlistProvider';
import { properties } from '@/lib/data';
import ListingsGrid from '@/components/listings/ListingsGrid';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishlistedProperties = properties.filter(p => wishlist.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Wishlist</h1>
        <p className="text-muted-foreground">All your favorite stays, saved in one place.</p>
      </div>
      
      {wishlistedProperties.length > 0 ? (
        <ListingsGrid listings={wishlistedProperties} />
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-6 text-xl font-bold">Your wishlist is empty</h2>
            <p className="mt-2 text-muted-foreground">As you browse, tap the heart on any stay to save it here.</p>
            <Button asChild className="mt-4">
                <a href="/listings">Explore Stays</a>
            </Button>
        </div>
      )}
    </div>
  );
}

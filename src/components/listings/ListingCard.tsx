
'use client';

import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import type { Property } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistProvider';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ListingCardProps {
  property: Property;
}

export default function ListingCard({ property }: ListingCardProps) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = wishlist.includes(property.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(property.id);
    } else {
      addToWishlist(property.id);
    }
  };

  const href = property.category ? (property.type === 'Experience' ? `/experiences/listing/${property.id}` : `/services/listing/${property.id}`) : `/listings/${property.id}`;

  return (
    <Link href={href} className="card">
      <div className="relative">
        <div className="card-image-container">
          <Image
            src={property.images[0]}
            data-ai-hint="property interior"
            alt={property.title}
            className="card-image"
            fill
          />
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 rounded-full text-white bg-black/20 hover:bg-black/40 hover:text-white"
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={cn('h-5 w-5', isWishlisted && 'fill-rose-500 text-rose-500')} />
        </Button>
      </div>
      <div className="card-content">
        <h3 className="card-title">{property.title}</h3>
        <div className="flex-grow"></div>
        <div className="flex justify-between items-center mt-1">
            <p className="card-price">
            {`₹${property.price}`}
            <span className="font-normal text-muted-foreground"> / night</span>
            </p>
            <div className="card-rating">
            <Star className="h-3 w-3 fill-current" />
            <span>{property.rating.toFixed(2)} ({property.reviews})</span>
            </div>
        </div>
      </div>
    </Link>
  );
}

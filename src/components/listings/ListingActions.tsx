
'use client';

import { Button } from '@/components/ui/button';
import { Heart, Share } from 'lucide-react';
import { useWishlist } from '@/context/WishlistProvider';
import type { Property } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ListingActionsProps {
  property: Property;
}

export function ListingActions({ property }: ListingActionsProps) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = wishlist.includes(property.id);
  const { toast } = useToast();

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(property.id);
    } else {
      addToWishlist(property.id);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: property.title,
      text: `Check out this amazing place I found: ${property.title}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support navigator.share
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: 'Link Copied',
          description: 'The link to this property has been copied to your clipboard.',
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: 'Error',
        description: 'Could not share this property.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" className="underline" onClick={handleShare}>
        <Share className="mr-2 h-4 w-4" />
        Share
      </Button>
      <Button variant="ghost" size="sm" className="underline" onClick={handleWishlistToggle}>
        <Heart className={cn('mr-2 h-4 w-4', isWishlisted && 'fill-rose-500 text-rose-500')} />
        {isWishlisted ? 'Saved' : 'Save'}
      </Button>
    </div>
  );
}

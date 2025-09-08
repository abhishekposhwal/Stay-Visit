"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useWishlist } from '@/context/WishlistContext';
import type { Property } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function ListingCard({ property }: { property: Property }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { toast } = useToast();
  const isWishlisted = wishlist.some((item) => item.id === property.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(property.id);
      toast({ title: "Removed from wishlist." });
    } else {
      addToWishlist(property);
      toast({ title: "Added to wishlist!" });
    }
  };

  const getLink = (property: Property) => {
    switch (property.type) {
        case 'Stay':
        case 'Experience':
        case 'Service':
             return `/listings/${property.id}`;
        default:
            return '#';
    }
  }

  return (
    <Card className="overflow-hidden border-none shadow-none rounded-lg">
      <CardContent className="p-0">
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((img, index) => (
                <CarouselItem key={index}>
                    <Link href={getLink(property)}>
                        <div className="aspect-[4/3] relative">
                            <Image
                            src={img}
                            alt={property.title}
                            fill
                            className="object-cover rounded-lg"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            data-ai-hint={`${property.type.toLowerCase()} interior`}
                            />
                        </div>
                    </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            {property.images.length > 1 && (
                <>
                    <CarouselPrevious className="absolute left-3" />
                    <CarouselNext className="absolute right-3" />
                </>
            )}
          </Carousel>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white"
            onClick={handleWishlistToggle}
          >
            <Heart
              className={cn(
                'h-5 w-5',
                isWishlisted ? 'text-red-500 fill-current' : 'text-gray-700'
              )}
            />
          </Button>
        </div>
        <Link href={getLink(property)}>
            <div className="p-2">
            <div className="flex justify-between items-start">
                <h3 className="font-bold truncate pr-2">{property.title}</h3>
                <div className="flex items-center gap-1 shrink-0">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>{property.rating.toFixed(1)}</span>
                </div>
            </div>
            <p className="text-sm text-muted-foreground truncate">
                {property.location}
            </p>
            <p className="mt-1">
                <span className="font-bold">${property.price}</span>
                <span className="text-sm text-muted-foreground"> / night</span>
            </p>
            </div>
        </Link>
      </CardContent>
    </Card>
  );
}

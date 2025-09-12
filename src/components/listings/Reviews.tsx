
'use client';

import type { Property } from '@/lib/types';
import { ChevronRight, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import React, { useMemo } from 'react';


interface ReviewsProps {
  property: Property;
}

export default function Reviews({ property }: ReviewsProps) {
  const ratingCategories = useMemo(() => {
    const baseRating = property.rating;
    const createRating = (offset: number, max: number = 5) => {
        const rating = baseRating + offset;
        return Math.max(4.5, Math.min(max, parseFloat(rating.toFixed(1))));
    }

    return [
        { name: 'Cleanliness', value: createRating(0.1) },
        { name: 'Accuracy', value: createRating(0.05) },
        { name: 'Check-in', value: createRating(0.2) },
        { name: 'Communication', value: createRating(0.15) },
        { name: 'Location', value: createRating(-0.1) },
        { name: 'Value', value: createRating(-0.05) },
    ];
  }, [property.rating]);

  if (!property.reviewDetails || property.reviewDetails.length === 0) {
    return (
        <div className="py-8">
            <h2 className="text-2xl font-semibold mb-4">No reviews yet</h2>
            <p className="text-muted-foreground">This property doesn't have any reviews yet. Be the first to leave one!</p>
        </div>
    )
  }
  
  return (
    <div className="py-8">
      <div className="flex items-center gap-2 mb-8">
        <Star className="h-6 w-6" />
        <h2 className={cn("text-2xl font-semibold")}>
          {property.rating} · {property.reviews} reviews
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 mb-12">
        {ratingCategories.map(category => (
            <div key={category.name} className="flex items-center justify-between">
                <span className="text-sm">{category.name}</span>
                <div className="flex items-center gap-2">
                    <Progress value={(category.value / 5) * 100} className="w-24 h-1"/>
                    <span className="text-xs font-medium">{category.value.toFixed(1)}</span>
                </div>
            </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {property.reviewDetails.slice(0, 6).map(review => (
            <div key={review.id}>
                <div className="flex items-center gap-4 mb-2">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={review.authorAvatar} alt={review.author} />
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm">{review.author}</p>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                    {review.text}
                </p>
            </div>
        ))}
      </div>
      
      {property.reviews > 6 && (
        <Button variant="default" className="mt-8" size="sm">
            Show all {property.reviews} reviews
            <ChevronRight />
        </Button>
      )}
    </div>
  );
}

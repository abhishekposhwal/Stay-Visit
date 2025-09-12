
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Property } from '@/lib/types';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface BookingHistoryItemProps {
  booking: {
    property: Property;
    checkIn: string;
    checkOut: string;
    total: number;
  };
}

export function BookingHistoryItem({ booking }: BookingHistoryItemProps) {
  const { property, checkIn, checkOut, total } = booking;

  return (
    <div className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4 hover:bg-muted/50 transition-colors">
      <div className="w-full sm:w-48 h-32 sm:h-auto flex-shrink-0 relative rounded-md overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-base">{property.title}</h3>
        <p className="text-sm text-muted-foreground">{property.location}</p>
        <Separator className="my-2" />
        <div className="text-sm space-y-1">
          <p><strong>Check-in:</strong> {format(new Date(checkIn), 'PPP')}</p>
          <p><strong>Check-out:</strong> {format(new Date(checkOut), 'PPP')}</p>
          <p><strong>Total paid:</strong> ₹{total.toLocaleString('en-IN')}</p>
        </div>
        <div className="mt-4 flex gap-2">
            <Button asChild size="sm">
                <Link href={`/listings/${property.id}`}>View Property</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
                <Link href="/work-in-progress">Get Invoice</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}

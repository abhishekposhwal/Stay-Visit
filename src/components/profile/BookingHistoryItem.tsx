
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { Property } from '@/lib/types';
import { format, differenceInCalendarDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar, FileText, Repeat } from 'lucide-react';

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
  const nights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));

  return (
    <div className="border rounded-xl p-4 flex flex-col sm:flex-row gap-6 hover:shadow-lg transition-shadow duration-300">
      <div className="w-full sm:w-60 h-48 sm:h-auto flex-shrink-0 relative rounded-lg overflow-hidden">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-grow flex flex-col">
        <div>
          <p className="text-sm text-muted-foreground">{property.type}</p>
          <Link href={`/listings/${property.id}`} className="hover:underline">
            <h3 className="font-bold text-lg leading-tight">{property.title}</h3>
          </Link>
          <p className="text-sm text-muted-foreground">{property.host.name} · {property.location}</p>
        </div>
        
        <Separator className="my-3" />
        
        <div className="text-sm text-muted-foreground flex items-center gap-4">
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{format(new Date(checkIn), 'LLL d, yyyy')} - {format(new Date(checkOut), 'LLL d, yyyy')}</span>
            </div>
            <span>·</span>
            <span>{nights} night{nights > 1 ? 's' : ''}</span>
        </div>
        <p className="text-sm font-semibold mt-1">Total paid: ₹{total.toLocaleString('en-IN')}</p>
        
        <div className="flex-grow"></div>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <Button asChild size="sm">
                <Link href={`/listings/${property.id}`}>
                    <Repeat className="h-4 w-4" />
                    Rebook
                </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
                <Link href="/work-in-progress">
                    <FileText className="h-4 w-4" />
                    Get Invoice
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}

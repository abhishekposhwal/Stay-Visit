
'use client';

import { useState } from 'react';
import type { Property } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { BookingCard } from './BookingCard';
import Link from 'next/link';

interface MobileBookingFooterProps {
  property: Property;
}

export function MobileBookingFooter({ property }: MobileBookingFooterProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-between items-center z-40">
            <SheetTrigger asChild>
                <div className="flex-grow cursor-pointer">
                    <p className="font-bold">{`₹${property.price}`}<span className="font-normal text-muted-foreground"> night</span></p>
                    <button className="text-sm underline">Select dates</button>
                </div>
            </SheetTrigger>
            <Link href="/work-in-progress">
              <Button size="lg">
                Reserve
              </Button>
            </Link>
        </div>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Complete your booking</SheetTitle>
            <SheetDescription>
              Review the details and confirm your reservation.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <BookingCard property={property} />
          </div>
        </SheetContent>
      </Sheet>
  );
}

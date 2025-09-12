
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import type { Property } from '@/lib/types';
import { Minus, Plus, Star } from 'lucide-react';
import Link from 'next/link';

interface BookingCardProps {
  property: Property;
}

interface GuestCounts {
    adults: number;
    children: number;
    infants: number;
    pets: number;
}

export function BookingCard({ property }: BookingCardProps) {
  const [date, setDate] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState<GuestCounts>({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isGuestPopoverOpen, setIsGuestPopoverOpen] = useState(false);

  const nights = date?.from && date?.to ? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 3600 * 24)) : 0;
  const serviceFee = nights > 0 ? 50 : 0;
  const taxes = nights > 0 ? Math.round(property.price * nights * 0.1) : 0;
  const total = nights > 0 ? property.price * nights + serviceFee + taxes : 0;

  const totalGuests = guests.adults + guests.children;
  const guestDisplay = totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}`: 'Add guests';

  const handleGuestChange = (type: keyof GuestCounts, delta: number) => {
    setGuests(prev => ({
        ...prev,
        [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + delta)
    }));
  }

  return (
    <Card className="sticky top-24 shadow-xl rounded-xl border p-4">
      <CardHeader className="p-2">
        <div className="flex justify-between items-baseline">
            <CardTitle>
                <span className="text-2xl font-bold">{`₹${property.price}`}</span>
                <span className="text-base font-normal text-muted-foreground"> night</span>
            </CardTitle>
            <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span className="font-medium">{property.rating}</span>
                <span className="text-sm text-muted-foreground">({property.reviews} reviews)</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className="border rounded-lg mt-4">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
                <div className="grid grid-cols-2 divide-x">
                    <div className={cn('p-3 text-left cursor-pointer', !date?.from && 'text-muted-foreground')}>
                        <span className="text-xs font-semibold block">CHECK-IN</span>
                        <span className="text-sm">{date?.from ? format(date.from, 'MM/dd/yyyy') : 'Add date'}</span>
                    </div>
                    <div className={cn('p-3 text-left cursor-pointer', !date?.to && 'text-muted-foreground')}>
                        <span className="text-xs font-semibold block">CHECKOUT</span>
                        <span className="text-sm">{date?.to ? format(date.to, 'MM/dd/yyyy') : 'Add date'}</span>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent 
                className="w-auto p-0" 
                align="start"
                onOpenAutoFocus={(e) => e.preventDefault()}
                >
                <Calendar
                    mode="range"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      if (newDate?.from && newDate?.to) {
                          setIsCalendarOpen(false);
                      }
                    }}
                    disabled={{ before: new Date() }}
                    initialFocus
                    numberOfMonths={2}
                />
            </PopoverContent>
          </Popover>

          <Separator />
          
          <Popover open={isGuestPopoverOpen} onOpenChange={setIsGuestPopoverOpen}>
            <PopoverTrigger asChild>
              <div className="p-3 cursor-pointer">
                <span className="text-xs font-semibold block">GUESTS</span>
                <span className={cn('text-sm', totalGuests === 0 && 'text-muted-foreground')}>
                  {guestDisplay}
                </span>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Adults</p>
                        <p className="text-sm text-muted-foreground">Ages 13 or above</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('adults', -1)} disabled={guests.adults <= 1}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span>{guests.adults}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('adults', 1)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Children</p>
                        <p className="text-sm text-muted-foreground">Ages 2-12</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('children', -1)} disabled={guests.children <= 0}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span>{guests.children}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('children', 1)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Infants</p>
                        <p className="text-sm text-muted-foreground">Under 2</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('infants', -1)} disabled={guests.infants <= 0}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span>{guests.infants}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('infants', 1)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                  <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Pets</p>
                        <p className="text-sm text-muted-foreground">Bringing a service animal?</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('pets', -1)} disabled={guests.pets <= 0}>
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span>{guests.pets}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('pets', 1)}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start space-y-4 p-2">
          <Link href="/work-in-progress" className="w-full">
            <Button className="w-full">
              Reserve
            </Button>
          </Link>
          {nights > 0 ? (
            <div className='w-full space-y-2 pt-2'>
              <p className="text-muted-foreground text-center w-full text-sm">You won't be charged yet</p>
              <div className="w-full flex justify-between">
                <span className="underline">{`₹${property.price} x ${nights} nights`}</span>
                <span>{`₹${property.price * nights}`}</span>
              </div>
              <div className="w-full flex justify-between">
                <span className="underline">Service fee</span>
                <span>{`₹${serviceFee}`}</span>
              </div>
               <div className="w-full flex justify-between">
                <span className="underline">Taxes</span>
                <span>{`₹${taxes}`}</span>
              </div>
              <Separator className="my-2"/>
              <div className="w-full flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{`₹${total}`}</span>
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-center w-full text-sm">Select dates to see a price</p>
          )}
      </CardFooter>
    </Card>
  );
}

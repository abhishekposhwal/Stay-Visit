"use client";

import { addDays, format } from 'date-fns';
import { useState } from 'react';
import { Calendar as CalendarIcon, Users, Star } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Property } from '@/lib/types';

export function BookingCard({ property }: { property: Property }) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 4),
  });
  const [guests, setGuests] = useState(2);
  const nights = date?.to && date?.from ? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 3600 * 24)) : 0;
  const serviceFee = 35;
  const totalPrice = property.price * nights + serviceFee;

  return (
    <Card className="shadow-lg">
      <CardHeader className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold">${property.price}</span>
            <span className="text-muted-foreground"> / night</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-medium">{property.rating}</span>
            <span className="text-sm text-muted-foreground">({property.reviews})</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Select
            value={String(guests)}
            onValueChange={(val) => setGuests(Number(val))}
          >
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <SelectValue placeholder="Number of guests" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={String(num)}>
                  {num} {num > 1 ? 'guests' : 'guest'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full mt-4 bg-accent hover:bg-accent/90">Book Now</Button>

        <div className="space-y-2 mt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">${property.price} x {nights} nights</span>
            <span>${property.price * nights}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service fee</span>
            <span>${serviceFee}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

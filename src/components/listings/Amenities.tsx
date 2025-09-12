
'use client';

import { Wifi, Tv, Wind, Utensils, ParkingCircle, PawPrint, Droplets, Snowflake, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BedDouble, Bath, Users, Star, Award, Share, Heart, DoorOpen, Medal } from 'lucide-react';


const iconMap: { [key: string]: React.ReactNode } = {
  'Wifi': <Wifi className="h-6 w-6" />,
  'Kitchen': <Utensils className="h-6 w-6" />,
  'Air conditioning': <Wind className="h-6 w-6" />,
  'TV': <Tv className="h-6 w-6" />,
  'Pool': <Droplets className="h-6 w-6" />,
  'Free parking': <ParkingCircle className="h-6 w-6" />,
  'Pet friendly': <PawPrint className="h-6 w-6" />,
  'Hot tub': <Snowflake className="h-6 w-6" />,
  'Sea view': <Sparkles className="h-6 w-6" />,
};

interface AmenitiesProps {
  amenities: string[];
}

export function Amenities({ amenities }: AmenitiesProps) {
  const displayedAmenities = amenities.slice(0, 10);

  return (
    <Dialog>
      <div>
        <h2 className={cn("text-2xl font-semibold mb-4")}>What this place offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-2">
          {displayedAmenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-4">
              <div className="w-6">
                {iconMap[amenity] || <div className="h-6 w-6" />}
              </div>
              <span className="text-sm">{amenity}</span>
            </div>
          ))}
        </div>
        {amenities.length > 10 && (
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-6">Show all {amenities.length} amenities</Button>
          </DialogTrigger>
        )}
      </div>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className={cn("text-2xl font-semibold")}>What this place offers</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-4">
                 <div className="w-6">
                    {iconMap[amenity] || <div className="h-6 w-6" />}
                </div>
                <span className="text-sm">{amenity}</span>
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

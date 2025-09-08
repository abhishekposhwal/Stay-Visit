
'use client';

import { Wifi, Tv, Wind, Utensils, ParkingCircle, PawPrint, Droplets, Snowflake } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';

const iconMap: { [key: string]: React.ReactNode } = {
  'Wifi': <Wifi className="h-5 w-5" />,
  'Kitchen': <Utensils className="h-5 w-5" />,
  'Air conditioning': <Wind className="h-5 w-5" />,
  'TV': <Tv className="h-5 w-5" />,
  'Pool': <Droplets className="h-5 w-5" />,
  'Free parking': <ParkingCircle className="h-5 w-5" />,
  'Pet friendly': <PawPrint className="h-5 w-5" />,
  'Hot tub': <Snowflake className="h-5 w-5" />,
};

interface AmenitiesProps {
  amenities: string[];
}

export function Amenities({ amenities }: AmenitiesProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedAmenities = amenities.slice(0, 8);

  return (
    <Dialog>
      <div>
        <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedAmenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-3">
              {iconMap[amenity] || <div className="h-5 w-5" />}
              <span className="text-base">{amenity}</span>
            </div>
          ))}
        </div>
        {amenities.length > 8 && (
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-6">Show all {amenities.length} amenities</Button>
          </DialogTrigger>
        )}
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>What this place offers</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-3">
                {iconMap[amenity] || <div className="h-5 w-5" />}
                <span className="text-base">{amenity}</span>
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

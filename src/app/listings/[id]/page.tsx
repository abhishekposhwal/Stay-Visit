
import { notFound } from 'next/navigation';
import { properties } from '@/lib/data';
import { ListingHero } from '@/components/listings/ListingHero';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BedDouble, Bath, Users, Star, Award, Share, Heart } from 'lucide-react';
import { BookingCard } from '@/components/listings/BookingCard';
import { Amenities } from '@/components/listings/Amenities';
import { MobileBookingFooter } from '@/components/listings/MobileBookingFooter';
import { ListingHighlights } from '@/components/listings/ListingHighlights';
import { HostInfo } from '@/components/listings/HostInfo';
import { GuestFavoriteBadge } from '@/components/listings/GuestFavoriteBadge';
import Reviews from '@/components/listings/Reviews';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

interface ListingPageProps {
  params: {
    id: string;
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const property = properties.find((p) => p.id === params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="pb-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-8">
        <div className="mb-4">
          <h1 className={cn("text-2xl md:text-3xl font-bold")}>{property.title}</h1>
          <div className="flex flex-wrap items-center justify-between mt-2 gap-y-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span className="font-medium">{property.rating} ({property.reviews} reviews)</span>
                </div>
                {property.host.isSuperhost && (
                    <div className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        <span className="font-medium">Superhost</span>
                    </div>
                )}
                <span className="font-medium underline">{property.location}</span>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="underline">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                </Button>
                <Button variant="ghost" size="sm" className="underline">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                </Button>
            </div>
          </div>
        </div>

        <ListingHero property={property} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 mt-8">
          <div className="lg:col-span-2">
            <div className="pb-6 border-b">
              <div className="flex justify-between items-start">
                  <div>
                      <h2 className={cn("text-2xl font-semibold")}>{property.type} hosted by {property.host.name}</h2>
                      <div className="flex items-center space-x-2 text-muted-foreground mt-1 text-sm">
                          <span>{property.guests} guests</span>
                          <span>·</span>
                          <span>{property.bedrooms} bedrooms</span>
                          <span>·</span>
                          <span>{property.beds} beds</span>
                          <span>·</span>
                          <span>{property.baths} baths</span>
                      </div>
                  </div>
                  <Avatar className="h-14 w-14">
                      <AvatarImage src={property.host.avatar} alt={property.host.name} />
                      <AvatarFallback>{property.host.name.charAt(0)}</AvatarFallback>
                  </Avatar>
              </div>
            </div>
            
            {(property.rating > 4.8 || property.reviews > 200) && <GuestFavoriteBadge />}
            
            <ListingHighlights />
            
            <Separator className="my-8"/>

            <div className="py-8 border-b">
              <h2 className={cn("text-2xl font-semibold mb-4")}>AI Summary</h2>
              <p className="text-lg text-foreground leading-relaxed">{property.summary}</p>
            </div>

            <div className="py-8">
              <h2 className={cn("text-2xl font-semibold mb-4")}>About this space</h2>
              <p className="text-foreground leading-loose">{property.details}</p>
            </div>
            
            <Separator className="my-8"/>

            <div className="py-8 border-b">
              <Amenities amenities={property.amenities} />
            </div>

            <HostInfo host={property.host} />

            <Separator className="my-8"/>

            <Reviews property={property} />

          </div>

          <div className="hidden lg:block lg:col-span-1 relative">
            <div className="sticky top-28">
              <BookingCard property={property} />
            </div>
          </div>
        </div>
      </div>
      <MobileBookingFooter property={property} />
    </div>
  );
}

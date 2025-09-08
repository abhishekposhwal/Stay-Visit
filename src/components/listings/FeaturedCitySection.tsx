import { properties } from '@/lib/data';
import { ListingCard } from './ListingCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export function FeaturedCitySection({ city }: { city: string }) {
  const cityStays = properties.filter(
    (p) => p.city === city && p.type === 'Stay'
  ).slice(0, 8);

  if (cityStays.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold font-headline">Stays in {city}</h2>
        <Button variant="link" asChild>
          <Link href={`/listings?city=${city}`}>
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {cityStays.map((property) => (
            <CarouselItem key={property.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="p-1">
                <ListingCard property={property} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}

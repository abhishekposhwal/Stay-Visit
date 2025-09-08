import { properties } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Star, Wifi, Tv, Utensils, Wind, MapPin, User, Calendar } from 'lucide-react';
import Image from 'next/image';
import { ListingHero } from '@/components/listings/ListingHero';
import { BookingCard } from '@/components/listings/BookingCard';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { MobileBookingFooter } from '@/components/listings/MobileBookingFooter';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';

export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }));
}

const amenityIcons: { [key: string]: React.ElementType } = {
  Wifi,
  'Air Conditioning': Wind,
  Kitchen: Utensils,
  TV,
};

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const property = properties.find((p) => p.id === params.id);

  if (!property) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-4">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">{property.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-primary" />
              <span>{property.rating} ({property.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{property.location}</span>
            </div>
          </div>
        </div>

        <ListingHero property={property} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mt-8">
          <div className="lg:col-span-2">
            <div className="prose max-w-none">
              <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{property.type} in {property.city} hosted by {property.host.name}</h2>
                    {property.category && <Badge variant="secondary">{property.category}</Badge>}
                  </div>
                  <Image src={property.host.avatar} alt={property.host.name} width={56} height={56} className="rounded-full" data-ai-hint="person photo" />
              </div>
              
              <Separator className="my-6" />

              <h3 className="font-semibold text-lg">About this place</h3>
              <p className="text-muted-foreground">{property.details}</p>
              
              <Separator className="my-6" />

              <h3 className="font-semibold text-lg">AI-powered summary</h3>
              <p className="text-muted-foreground italic bg-secondary/50 p-4 rounded-lg">{property.summary}</p>

              <Separator className="my-6" />

              <h3 className="font-semibold text-lg">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {property.amenities.map(amenity => {
                  const Icon = amenityIcons[amenity] || Wifi;
                  return (
                    <div key={amenity} className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <span>{amenity}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 hidden lg:block">
              <BookingCard property={property} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
      <MobileBookingFooter property={property} />
    </div>
  );
}

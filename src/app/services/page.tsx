import { properties } from '@/lib/data';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';

export default function ServicesPage() {
  const serviceProperties = properties.filter(
    (property) => property.type === 'Service'
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-6">Helpful Services</h1>
         <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
          Make your trip seamless with our range of services, from airport transfers to private chefs.
        </p>
        <ListingGrid properties={serviceProperties} />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}

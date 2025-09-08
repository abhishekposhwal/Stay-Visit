import { properties } from '@/lib/data';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';

export default function ListingsPage({
  searchParams,
}: {
  searchParams: { city?: string; type?: string };
}) {
  const filteredProperties = properties.filter((property) => {
    const cityMatch = searchParams.city
      ? property.city.toLowerCase() === searchParams.city.toLowerCase()
      : true;
    const typeMatch = searchParams.type
      ? property.type === searchParams.type
      : true;
    return cityMatch && typeMatch;
  });
  
  const title = searchParams.city 
    ? `Results for "${searchParams.city}"` 
    : searchParams.type 
    ? `${searchParams.type}s` 
    : 'All Listings';

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-6">{title}</h1>
        <ListingGrid properties={filteredProperties} />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}

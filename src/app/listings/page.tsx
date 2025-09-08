
import ListingsGrid from '@/components/listings/ListingsGrid';
import { properties } from '@/lib/data';

interface ListingsPageProps {
  searchParams: {
    city?: string;
  };
}

export default function ListingsPage({ searchParams }: ListingsPageProps) {
  const city = searchParams.city;

  const filteredProperties = city
    ? properties.filter(p => p.location.toLowerCase().includes(city.toLowerCase()))
    : properties;

  const pageTitle = city ? `Stays in ${city}` : 'Explore All Stays';
  
  return (
    <div className="container mx-auto px-4 py-8 pt-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{pageTitle}</h1>
      </div>
      <ListingsGrid listings={filteredProperties} />
    </div>
  );
}

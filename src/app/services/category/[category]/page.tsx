
import ListingsGrid from '@/components/listings/ListingsGrid';
import { services } from '@/lib/services-data';
import { notFound } from 'next/navigation';

interface ServiceCategoryPageProps {
  params: {
    category: string;
  };
}

const SERVICE_CATEGORIES = ['Photography' , 'Chefs', 'Training', 'Massage'];

export default function ServiceCategoryPage({ params }: ServiceCategoryPageProps) {
  const { category } = params;

  const validCategories = SERVICE_CATEGORIES.map(c => c.toLowerCase());

  if (!validCategories.includes(category.toLowerCase())) {
    notFound();
  }

  const filteredServices = services.filter(p => p.category.toLowerCase() === category.toLowerCase());

  const pageTitle = category.charAt(0).toUpperCase() + category.slice(1);
  
  return (
    <div className="mx-auto px-4 py-8 pt-24 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{pageTitle} Services</h1>
      </div>
      <ListingsGrid listings={filteredServices} />
    </div>
  );
}

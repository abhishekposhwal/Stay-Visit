
import ListingsGrid from '@/components/listings/ListingsGrid';
import { services } from '@/lib/services-data';
import { notFound } from 'next/navigation';
import { use } from 'react';

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
    <div className="container mx-auto px-4 py-8 pt-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{pageTitle} Services</h1>
      </div>
      <ListingsGrid listings={filteredServices} />
    </div>
  );
}

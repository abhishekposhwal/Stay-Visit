
import ListingsGrid from '@/components/listings/ListingsGrid';
import { experiences } from '@/lib/experiences-data';
import { notFound } from 'next/navigation';

interface ExperienceCategoryPageProps {
  params: {
    category: string;
  };
}

export default function ExperienceCategoryPage({ params }: ExperienceCategoryPageProps) {
  const { category } = params;

  const validCategories = ['Originals', 'Popular'];

  if (!validCategories.includes(category)) {
    notFound();
  }

  const filteredExperiences = experiences.filter(p => p.category === category);

  const pageTitle = category === 'Originals' 
    ? 'Airbnb Originals' 
    : 'Popular with travellers from your area';
  
  return (
    <div className="container mx-auto px-4 py-8 pt-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{pageTitle}</h1>
      </div>
      <ListingsGrid listings={filteredExperiences} />
    </div>
  );
}

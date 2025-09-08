
'use client';

import Link from 'next/link';
import ListingsGrid from '@/components/listings/ListingsGrid';
import type { Property } from '@/lib/types';
import { services } from '@/lib/services-data';
import { SearchBar } from '@/components/layout/SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';

const SERVICE_CATEGORIES = ['Photography' , 'Chefs', 'Training', 'Massage'];

export default function ServicesPage() {

  const getServicesByCategory = (category: string): Property[] => {
    return services.filter(p => p.category === category);
  }
  
  const isMobile = useIsMobile();

  return (
    <div className="space-y-8">
      <header className="relative pt-16">
        <div className="relative z-10 text-center">
        
        </div>
      </header>

      {!isMobile && (
        <div className="sticky top-16 z-40 pb-4 -mt-16">
          <div className="mt-8">
              <SearchBar />
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 space-y-12">
        {SERVICE_CATEGORIES.map(category => {
          const categoryServices = getServicesByCategory(category);
          if (categoryServices.length === 0) return null;
          
          return (
            <section key={category}>
              <h2 className="text-3xl font-bold my-8">
                <Link href={`/services/category/${encodeURIComponent(category)}`} className="hover:text-accent transition-colors cursor-pointer inline-flex items-center gap-2">
                  {category}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentColor', strokeWidth: '5.33333', overflow: 'visible' }}>
                    <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path>
                  </svg>
                </Link>
              </h2>
              <ListingsGrid listings={categoryServices} />
            </section>
          );
        })}
      </div>
    </div>
  );
}

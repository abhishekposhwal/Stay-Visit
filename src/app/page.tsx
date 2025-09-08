

'use client';

import { properties } from '@/lib/data';
import ListingsGrid from '@/components/listings/ListingsGrid';
import Link from 'next/link';
import type { Property } from '@/lib/types';
import PageWithSearchBarLayout from '@/components/layout/PageWithSearchBarLayout';

const CITIES = [
    'Mumbai',
    'Delhi',
    'Bengaluru',
    'Chennai',
    'Goa',
    'Jaipur',
    'Kolkata',
    'Hyderabad',
    'Pune',
    'Udaipur',
    'Munnar',
    'Pondicherry',
    'Srinagar',
]

export default function Home() {
  const getPropertiesByCity = (city: string): Property[] => {
    return properties.filter(p => p.location.toLowerCase().includes(city.toLowerCase()));
  }

  return (
    <PageWithSearchBarLayout>
      <div className="space-y-8">
        <div className="container mx-auto px-4 space-y-12">
          {CITIES.map(city => {
            const cityProperties = getPropertiesByCity(city);
            if (cityProperties.length === 0) return null;
            
            return (
              <section key={city}>
                <h2 className="text-3xl font-bold my-8">
                  <Link href={`/listings?city=${encodeURIComponent(city)}`} className="hover:text-accent transition-colors cursor-pointer inline-flex items-center gap-2">
                    Stays in {city}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentColor', strokeWidth: '5.33333', overflow: 'visible' }}>
                      <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path>
                    </svg>
                  </Link>
                </h2>
                <ListingsGrid listings={cityProperties} />
              </section>
            );
          })}
        </div>
      </div>
    </PageWithSearchBarLayout>
  );
}

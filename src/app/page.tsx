

'use client';

import { properties } from '@/lib/data';
import ListingsGrid from '@/components/listings/ListingsGrid';
import Link from 'next/link';
import type { Property } from '@/lib/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { Playfair_Display, Inter } from 'next/font/google';

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

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
  variable: '--font-playfair-display',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function Home() {
  const isMobile = useIsMobile();

  const getPropertiesByCity = (city: string, count: number): Property[] => {
    return properties.filter(p => p.location.toLowerCase().includes(city.toLowerCase())).slice(0, count);
  }

  return (
    <div className="space-y-8">
      {CITIES.map(city => {
        const cityProperties = getPropertiesByCity(city, 7);
        if (cityProperties.length === 0) return null;
        
        return (
          <section key={city} className="container mx-auto px-4">
            <h2 className="text-2xl font-bold my-8">
              <Link href={`/listings?city=${encodeURIComponent(city)}`} className="transition-colors cursor-pointer inline-flex items-center gap-2">
                Stays in {city}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentColor', strokeWidth: '5.33333', overflow: 'visible' }}>
                  <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path>
                </svg>
              </Link>
            </h2>
            <ListingsGrid listings={cityProperties} layout="horizontal" />
          </section>
        );
      })}
    </div>
  );
}

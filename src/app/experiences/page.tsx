
'use client';

import ListingsGrid from '@/components/listings/ListingsGrid';
import type { Property } from '@/lib/types';
import { useEffect, useState } from 'react';
import { experiences } from '@/lib/experiences-data';
import Link from 'next/link';


export default function ExperiencesPage() {
    const [originalProperties, setOriginalProperties] = useState<Property[]>([]);
    const [popularProperties, setPopularProperties] = useState<Property[]>([]);

    useEffect(() => {
        setOriginalProperties(experiences.filter(p => p.category === 'Originals').slice(0, 4));
        setPopularProperties(experiences.filter(p => p.category === 'Popular').slice(0, 4));
    }, []);

    return (
        <div className="container mx-auto px-6 py-8 pt-24 space-y-12">
          <section>
            <h2 className="text-3xl font-bold my-8">
              <Link href="/experiences/category/Originals" className="hover:text-accent transition-colors cursor-pointer inline-flex items-center gap-2">
                Airbnb Originals
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentColor', strokeWidth: '5.33333', overflow: 'visible' }}>
                  <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path>
                </svg>
              </Link>
            </h2>
            <ListingsGrid listings={originalProperties} />
          </section>
          <section>
            <h2 className="text-3xl font-bold my-8">
              <Link href="/experiences/category/Popular" className="hover:text-accent transition-colors cursor-pointer inline-flex items-center gap-2">
                Popular with travellers from your area
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentColor', strokeWidth: '5.33333', overflow: 'visible' }}>
                  <path fill="none" d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28"></path>
                </svg>
              </Link>
            </h2>
            <ListingsGrid listings={popularProperties} />
          </section>
        </div>
    );
}


'use client';

import ListingsGrid from '@/components/listings/ListingsGrid';
import type { Property } from '@/lib/types';
import { useEffect, useState } from 'react';
import { experiences } from '@/lib/experiences-data';
import Link from 'next/link';
import { SearchBar } from '@/components/layout/SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';


export default function ExperiencesPage() {
    const [originalProperties, setOriginalProperties] = useState<Property[]>([]);
    const [popularProperties, setPopularProperties] = useState<Property[]>([]);
    const isMobile = useIsMobile();

    useEffect(() => {
        setOriginalProperties(experiences.filter(p => p.category === 'Originals'));
        setPopularProperties(experiences.filter(p => p.category === 'Popular'));
    }, []);

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
        </div>
    );
}

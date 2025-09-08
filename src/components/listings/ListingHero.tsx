
'use client';

import Image from 'next/image';
import type { Property } from '@/lib/types';
import { useState } from 'react';
import { ImageCarouselModal } from './ImageCarouselModal';
import { Button } from '@/components/ui/button';

interface ListingHeroProps {
  property: Property;
}

export function ListingHero({ property }: ListingHeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const displayImages = property.images.slice(0, 5);
  const mainImage = displayImages[0];
  const galleryImages = displayImages.slice(1);

  return (
    <>
      <div className="relative h-[250px] md:h-[500px] overflow-hidden rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-full">
            <div className="relative md:col-span-2 md:row-span-2 h-full">
            <button onClick={() => openModal(0)} className="w-full h-full">
                <Image
                src={mainImage}
                data-ai-hint="property exterior"
                alt={`Main view of ${property.title}`}
                fill
                className="object-cover w-full h-full"
                priority
                />
            </button>
            </div>
            {galleryImages.map((image, index) => (
            <div key={index} className="relative hidden md:block h-full">
                <button onClick={() => openModal(index + 1)} className="w-full h-full">
                <Image
                    src={image}
                    data-ai-hint="property room"
                    alt={`View ${index + 2} of ${property.title}`}
                    fill
                    className="object-cover w-full h-full"
                />
                </button>
            </div>
            ))}
        </div>
        <Button onClick={() => openModal(0)} className="absolute bottom-4 right-4 bg-white/90 text-foreground hover:bg-white">
            Show all photos
        </Button>
      </div>


      <ImageCarouselModal
        images={property.images}
        startIndex={selectedImageIndex}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}

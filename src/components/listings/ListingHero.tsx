import Image from 'next/image';
import type { Property } from '@/lib/types';

export function ListingHero({ property }: { property: Property }) {
  const [mainImage, ...otherImages] = property.images;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-2 max-h-[60vh] rounded-xl overflow-hidden">
      <div className="md:row-span-2 relative">
        <Image
          src={mainImage}
          alt={`Main image for ${property.title}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          data-ai-hint="listing view"
        />
      </div>
      {otherImages.slice(0, 2).map((image, index) => (
        <div key={index} className="relative hidden md:block">
          <Image
            src={image}
            alt={`Image ${index + 2} for ${property.title}`}
            fill
            className="object-cover"
            sizes="25vw"
            data-ai-hint="interior detail"
          />
        </div>
      ))}
      {property.images.length > 3 && (
        <div className="hidden md:block">
            <div className="relative">
                <Image
                    src={otherImages[2]}
                    alt={`Image 4 for ${property.title}`}
                    fill
                    className="object-cover"
                    sizes="25vw"
                    data-ai-hint="amenity photo"
                />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">+{property.images.length - 3} more</span>
                </div>
            </div>
        </div>
      )}
       {property.images.length <= 3 && otherImages.length < 2 && (
         <div className="hidden md:block relative">
            <Image
                src={property.images[0]}
                alt={`Placeholder image`}
                fill
                className="object-cover blur-sm"
                sizes="25vw"
            />
        </div>
      )}
    </div>
  );
}

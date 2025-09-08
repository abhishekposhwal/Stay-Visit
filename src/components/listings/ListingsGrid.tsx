
import ListingCard from './ListingCard';
import type { Property } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ListingsGridProps {
  listings: Property[];
  columns?: 2 | 3 | 4 | 5;
}

export default function ListingsGrid({ listings, columns = 5 }: ListingsGridProps) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-2">No listings found</h2>
        <p className="text-muted-foreground">Try adjusting your search or filters.</p>
      </div>
    );
  }

  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2 gap-6',
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6',
    4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6',
    5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6',
  }

  return (
    <div className={cn("grid", gridClasses[columns])}>
      {listings.map((property) => (
        <div key={property.id}>
          <ListingCard property={property} />
        </div>
      ))}
    </div>
  );
}

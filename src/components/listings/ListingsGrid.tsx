
import ListingCard from './ListingCard';
import type { Property } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ListingsGridProps {
  listings: Property[];
  layout?: 'grid' | 'horizontal';
}

export default function ListingsGrid({ listings, layout = 'grid' }: ListingsGridProps) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-2">No listings found</h2>
        <p className="text-muted-foreground">Try adjusting your search or filters.</p>
      </div>
    );
  }

  const gridClasses = layout === 'horizontal' 
    ? "grid-flow-col auto-cols-max gap-4 pb-4 overflow-x-auto"
    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6";

  return (
    <div className={cn("grid", gridClasses)}>
      {listings.map((property) => (
        <div key={property.id} className={cn(layout === 'horizontal' && "w-64 flex-shrink-0")}>
          <ListingCard property={property} />
        </div>
      ))}
    </div>
  );
}

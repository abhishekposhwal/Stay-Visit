import type { Property } from '@/lib/types';
import { ListingCard } from './ListingCard';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface ListingGridProps {
  properties: Property[];
}

export function ListingGrid({ properties }: ListingGridProps) {
  if (properties.length === 0) {
    return (
      <Alert className="max-w-md mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Results Found</AlertTitle>
        <AlertDescription>
          Try adjusting your search or filters to find what you're looking for.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
      {properties.map((property) => (
        <ListingCard key={property.id} property={property} />
      ))}
    </div>
  );
}

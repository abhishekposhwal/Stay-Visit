import { Button } from '@/components/ui/button';
import type { Property } from '@/lib/types';

export function MobileBookingFooter({ property }: { property: Property }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t z-40">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-bold">${property.price}</span>
          <span className="text-muted-foreground"> / night</span>
        </div>
        <Button className="bg-accent hover:bg-accent/90">Book Now</Button>
      </div>
    </div>
  );
}

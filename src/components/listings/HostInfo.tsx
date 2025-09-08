
import type { Property } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '../ui/badge';

interface HostInfoProps {
    host: Property['host'];
}

export function HostInfo({ host }: HostInfoProps) {
  return (
    <div className="py-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={host.avatar} alt={host.name} />
          <AvatarFallback>{host.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
            <h3 className="text-xl font-bold">Hosted by {host.name}</h3>
            {host.isSuperhost && <Badge className="mt-1">Superhost</Badge>}
        </div>
      </div>
    </div>
  );
}

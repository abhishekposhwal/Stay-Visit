
'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Search, Minus, Plus } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/hooks/use-mobile';

interface GuestCounts {
    adults: number;
    children: number;
    infants: number;
    pets: number;
}

export function SearchBar() {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState<GuestCounts>({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [isCompact, setIsCompact] = useState(false);
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [isGuestPopoverOpen, setIsGuestPopoverOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const isMobile = useIsMobile();
  const destinationInputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSearch = () => {
    const city = destination.trim() || 'Goa';
    router.push(`/listings?city=${encodeURIComponent(city)}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isDatePopoverOpen || isGuestPopoverOpen || isMobile) return;
      const shouldBeCompact = window.scrollY > 20;
      if (shouldBeCompact !== isCompact) {
        setIsCompact(shouldBeCompact);
        if (!shouldBeCompact) {
          setIsActive(false);
        }
      }
    };
    if (!isMobile) {
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    return () => {
        if (!isMobile) {
            window.removeEventListener('scroll', handleScroll);
        }
    }
  }, [isCompact, isDatePopoverOpen, isGuestPopoverOpen, isMobile]);

  useEffect(() => {
    if(isMobile) {
        setIsCompact(true);
        setIsActive(false);
    } else {
        const shouldBeCompact = window.scrollY > 20;
        setIsCompact(shouldBeCompact);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if ((event.target as HTMLElement).closest('[data-radix-popper-content-wrapper]')) {
            return;
        }

        if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
            if (isActive) {
                setIsActive(false);
                if (isMobile) {
                    setIsCompact(true);
                }
            }
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, isMobile]);

  const totalGuests = guests.adults + guests.children;
  const guestDisplay = totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}`: 'Add guests';

  const handleGuestChange = (type: keyof GuestCounts, delta: number) => {
    setGuests(prev => ({
        ...prev,
        [type]: Math.max(0, prev[type] + delta)
    }));
  }

  const handleCompactClick = (section: 'destination' | 'date' | 'guest') => {
    setIsActive(true);
    setTimeout(() => {
      if (section === 'destination' && destinationInputRef.current) {
        destinationInputRef.current.focus();
      } else if (section === 'date') {
        setIsDatePopoverOpen(true);
      } else if (section === 'guest') {
        setIsGuestPopoverOpen(true);
      }
    }, 100);
  };
  
  const showCompact = isCompact && !isActive;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center text-center px-4" ref={searchBarRef}>
        <div
          className={cn(
            "bg-background/80 backdrop-blur-sm rounded-full shadow-lg flex items-center p-2 text-foreground transition-all duration-500 ease-in-out border",
            showCompact ? 'max-w-md cursor-pointer' : ''
          )}
          onClick={() => {
            if (showCompact && !isActive) {
              setIsActive(true);
            }
          }}
        >
        
        {showCompact ? (
             <div className="flex items-center justify-between w-full px-2">
                <Button variant="ghost" className="rounded-full font-normal hover:bg-transparent text-sm px-2" onClick={(e) => { e.stopPropagation(); handleCompactClick('destination'); }}>Anywhere</Button>
                <Separator orientation="vertical" className="h-8" />
                <Button variant="ghost" className="rounded-full font-normal hover:bg-transparent text-sm px-2" onClick={(e) => { e.stopPropagation(); handleCompactClick('date'); }}>Anytime</Button>
                <Separator orientation="vertical" className="h-8" />
                <div className="flex items-center">
                    <Button variant="ghost" className="rounded-full font-normal hover:bg-transparent text-sm px-2" onClick={(e) => { e.stopPropagation(); handleCompactClick('guest'); }}>Add guests</Button>
                    <Button onClick={handleSearch} className="rounded-full h-10 w-10 flex items-center justify-center bg-primary-gradient text-accent-foreground p-0">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        ) : (
            <>
            <div className="flex-[1.25] relative">
                <label htmlFor="destination" className="block text-xs font-bold text-left pl-6 text-foreground/80">
                Where
                </label>
                <Input
                id="destination"
                ref={destinationInputRef}
                placeholder="Search destinations"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyDown={handleKeyDown}
                className="border-none focus-visible:ring-transparent p-0 h-auto bg-transparent pl-6"
                />
            </div>

            <Separator orientation="vertical" className="h-8" />
            
            <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
                <PopoverTrigger asChild>
                    <div className="flex-1 flex cursor-pointer">
                        <div className="flex-1 text-left pl-6">
                            <label className="block text-xs font-bold text-foreground/80">Check in</label>
                            <div className="text-sm text-muted-foreground">
                                {date?.from ? format(date.from, 'LLL dd') : <span>Add dates</span>}
                            </div>
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                />
                </PopoverContent>
            </Popover>
            <Separator orientation="vertical" className="h-8" />
            <Popover>
                <PopoverTrigger asChild>
                     <div className="flex-1 flex cursor-pointer">
                        <div className="flex-1 text-left px-4">
                            <label className="block text-xs font-bold text-foreground/80">Check out</label>
                            <div className="text-sm text-muted-foreground">
                                {date?.to ? format(date.to, 'LLL dd') : <span>Add dates</span>}
                            </div>
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                />
                </PopoverContent>
            </Popover>
            
            <Separator orientation="vertical" className="h-8" />

            <div className="flex-1 flex items-center justify-between pl-4 pr-2">
                <Popover open={isGuestPopoverOpen} onOpenChange={setIsGuestPopoverOpen}>
                    <PopoverTrigger asChild>
                        <div className="text-left w-full cursor-pointer">
                            <label className="block text-xs font-bold text-foreground/80">Who</label>
                            <div className="text-sm text-muted-foreground truncate">{guestDisplay}</div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Adults</p>
                                    <p className="text-sm text-muted-foreground">Ages 13 or above</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('adults', -1)} disabled={guests.adults <= 0}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span>{guests.adults}</span>
                                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('adults', 1)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                 <div>
                                    <p className="font-medium">Children</p>
                                    <p className="text-sm text-muted-foreground">Ages 2-12</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('children', -1)} disabled={guests.children <= 0}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span>{guests.children}</span>
                                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('children', 1)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Infants</p>
                                    <p className="text-sm text-muted-foreground">Under 2</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('infants', -1)} disabled={guests.infants <= 0}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span>{guests.infants}</span>
                                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('infants', 1)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                             <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Pets</p>
                                    <p className="text-sm text-muted-foreground">Bringing a service animal?</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('pets', -1)} disabled={guests.pets <= 0}>
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span>{guests.pets}</span>
                                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleGuestChange('pets', 1)}>
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                 <Button onClick={handleSearch} className="bg-primary-gradient rounded-full p-3 flex items-center justify-center text-accent-foreground hover:bg-primary-gradient-hover">
                    <Search className="h-5 w-5" />
                </Button>
            </div>
            </>
        )}
        </div>
    </div>
  );
}

    

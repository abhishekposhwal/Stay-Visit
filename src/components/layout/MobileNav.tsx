"use client";

import { Heart, Home, Search, Sparkles, Sprout } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { SearchBar } from '../shared/SearchBar';
import { useState } from 'react';

export function MobileNav() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/wishlist', icon: Heart, label: 'Wishlist' },
    { href: '/experiences', icon: Sparkles, label: 'Experiences' },
    { href: '/services', icon: Sprout, label: 'Services' },
  ];

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-background border-t z-40">
        <div className="flex justify-around items-center h-full">
          <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center text-muted-foreground">
                <Search className="h-6 w-6" />
                <span className="text-xs">Search</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-lg">
              <SheetHeader className="mb-4">
                <SheetTitle>Where to?</SheetTitle>
              </SheetHeader>
              <SearchBar onSearch={() => setIsSearchOpen(false)} />
            </SheetContent>
          </Sheet>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="md:hidden h-16" />
    </>
  );
}

'use client';

import Link from 'next/link';
import { CircleUser, Heart, Home, Menu, Search, Sparkles, Sprout, Star } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Logo } from '../shared/Logo';
import { SearchBar } from '../shared/SearchBar';

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/experiences', label: 'Experiences', icon: Sparkles },
    { href: '/services', label: 'Services', icon: Sprout },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        
        {/* Mobile Menu */}
        <div className="md:hidden mr-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium mt-6">
                <Logo />
                {navLinks.map((link) => (
                   <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'flex items-center gap-4 px-2.5 transition-colors hover:text-foreground',
                        pathname === link.href ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Desktop Search */}
        <div className="hidden md:flex flex-1">
            <div className="w-full max-w-sm">
                 <SearchBar />
            </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-auto">
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary font-semibold' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User Dropdown */}
        <div className="flex items-center justify-end ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/wishlist"><Heart className="mr-2 h-4 w-4" />Wishlist</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/recommendations"><Star className="mr-2 h-4 w-4" />Recommendations</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log in</DropdownMenuItem>
              <DropdownMenuItem>Sign up</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

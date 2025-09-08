
'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HardHat, Heart, Home, LogIn, LogOut, MessageSquare, Sparkles, User as UserIcon, Zap, UserPlus, Search } from 'lucide-react';
import { useWishlist } from '@/context/WishlistProvider';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Input } from '../ui/input';

const navLinks = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { href: "/experiences", label: "Experiences", icon: <Zap className="h-5 w-5" /> },
    { href: "/services", label: "Services", icon: <HardHat className="h-5 w-5" /> },
]

export function Navbar() {
  const { wishlist } = useWishlist();
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [destination, setDestination] = useState('');
  const router = useRouter();

  const handleSearch = () => {
      if (destination) {
          router.push(`/listings?city=${encodeURIComponent(destination)}`);
          setIsSearchOpen(false);
      }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
          handleSearch();
      }
  };

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300 bg-background shadow-sm"
    )}>
      <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center flex-1">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Home className={cn("h-6 w-6 text-accent transition-colors")} />
              <span className={cn(
                "font-bold text-lg transition-colors text-foreground"
              )}>
                StayVisit
              </span>
            </Link>
          </div>
        
        <nav className="hidden md:flex items-center justify-center space-x-1 text-sm font-bold">
          {navLinks.map((link) => (
            <Button key={link.label} asChild variant="ghost" className="hover:bg-transparent">
                <Link href={link.href} className="flex items-center gap-1">
                    {link.icon}
                    <span>{link.label}</span>
                </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center justify-end flex-1 md:gap-4">
            <div className="md:hidden">
              <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Search className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-auto">
                  <SheetHeader>
                    <SheetTitle>Search by City</SheetTitle>
                  </SheetHeader>
                  <div className="flex items-center space-x-2 py-4">
                    <div className="grid flex-1 gap-2">
                      <Input
                        id="city-mobile"
                        placeholder="Enter a city..."
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                    <Button type="submit" size="icon" onClick={handleSearch}>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          
            <Link href="/work-in-progress" className="hidden md:block">
              <Button variant="ghost" className="transition-colors font-bold text-foreground hover:bg-accent/10 rounded-full">
                Become a host
              </Button>
            </Link>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={user?.photoURL || "https://picsum.photos/100/100"} data-ai-hint="person face" alt="User avatar" />
                            <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    {user ? (
                      <>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/wishlist">
                                <Heart className="mr-2" /> Wishlist ({wishlist.length})
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                           <Link href="/profile"><UserIcon className="mr-2" /> Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/work-in-progress">
                                <MessageSquare className="mr-2" /> Inbox
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={signOut}>
                            <LogOut className="mr-2" /> Logout
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/login"><LogIn className="mr-2"/> Login</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/signup"><UserPlus className="mr-2"/> Sign up</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

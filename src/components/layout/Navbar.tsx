
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
import { HardHat, Heart, LogIn, LogOut, MessageSquare, Sparkles, User as UserIcon, Zap, UserPlus, Search, X, Home, Bell } from 'lucide-react';
import { useWishlist } from '@/context/WishlistProvider';
import { cn } from '@/lib/utils';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';
import { Input } from '../ui/input';
import { mockNotifications } from '@/lib/notifications-data';
import { HoverBorderGradient } from '../ui/hover-border-gradient';

const navLinks = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { href: "/experiences", label: "Experiences", icon: <Zap className="h-5 w-5" /> },
    { href: "/services", label: "Services", icon: <HardHat className="h-5 w-5" /> },
]

export function Navbar() {
  const { wishlist } = useWishlist();
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  const [destination, setDestination] = useState('');
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const router = useRouter();

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  const handleSearch = () => {
      if (destination) {
          router.push(`/listings?city=${encodeURIComponent(destination)}`);
          setIsMobileSearchVisible(false);
      }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
          handleSearch();
      }
  };

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      // Hide nav on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header className={cn(
        "w-full border-b transition-all duration-300 bg-background shadow-sm z-50 md:sticky top-0",
        "md:transform-none", // Keep it always visible on md+
        showNav ? "translate-y-0" : "-translate-y-full"
    )}>
      <div className="container flex h-16 items-center justify-between">
          {isMobileSearchVisible ? (
             <div className="flex items-center w-full gap-2 md:hidden">
                <Input
                    placeholder="Search destinations"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow"
                    autoFocus
                />
                <Button size="icon" onClick={handleSearch} className="rounded-full">
                    <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileSearchVisible(false)} className="rounded-full">
                    <X className="h-6 w-6" />
                </Button>
            </div>
          ) : (
            <>
            <div className="flex items-center flex-1">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: 'rgba(131, 58, 180, 1)' }} />
                      <stop offset="40%" style={{ stopColor: 'rgba(255, 23, 23, 1)' }} />
                      <stop offset="100%" style={{ stopColor: 'rgba(252, 176, 69, 1)' }} />
                    </linearGradient>
                  </defs>
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className={cn(
                    "font-bold text-lg transition-colors text-foreground"
                )}>
                    StayVisit
                </span>
                </Link>
            </div>
            
            <nav className="hidden md:flex items-center justify-center space-x-1 text-sm">
            {navLinks.map((link) => (
                <Button key={link.label} asChild variant="ghost" className="hover:bg-transparent text-sm">
                    <Link href={link.href} className="flex items-center gap-1">
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                </Button>
            ))}
            </nav>

            <div className="flex items-center justify-end flex-1 md:gap-4">
                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileSearchVisible(true)} className="rounded-full">
                        <Search className="h-6 w-6" />
                    </Button>
                </div>
            
                <Link href="/work-in-progress" className="hidden md:block">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center text-sm"
                  >
                    Become a host
                  </HoverBorderGradient>
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
                    <DropdownMenuContent className="w-48" align="end">
                        {user ? (
                        <>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/notifications">
                                    <Bell className="mr-2" /> Notifications {unreadNotifications > 0 && `(${unreadNotifications})`}
                                </Link>
                            </DropdownMenuItem>
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
                                <Link href="/inbox">
                                    <MessageSquare className="mr-2" /> Inbox
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                                onClick={signOut} 
                                className="text-destructive hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground"
                            >
                                <LogOut className="mr-2" /> Logout
                            </DropdownMenuItem>
                        </>
                        ) : (
                        <>
                            <DropdownMenuItem asChild>
                                <Link href="/wishlist">
                                    <Heart className="mr-2" /> Wishlist
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
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
          </>
          )}
      </div>
    </header>
  );
}

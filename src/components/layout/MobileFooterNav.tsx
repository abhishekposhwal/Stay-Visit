
'use client';

import { cn } from '@/lib/utils';
import { HardHat, Heart, Home, LogIn, Search, User, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { useAuth } from '@/context/AuthProvider';


export function MobileFooterNav() {
    const pathname = usePathname();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [destination, setDestination] = useState('');
    const router = useRouter();
    const { user } = useAuth();

    const navLinks = [
        { href: "/", label: "Stays", icon: <Home className="h-6 w-6" /> },
        { href: "/experiences", label: "Experiences", icon: <Zap className="h-6 w-6" /> },
        { href: "/wishlist", label: "Wishlist", icon: <Heart className="h-6 w-6" /> },
        { href: user ? "/work-in-progress" : "/login", label: user ? "Profile" : "Log in", icon: user ? <User className="h-6 w-6" /> : <LogIn className="h-6 w-6" /> },
    ];

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
        <>
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50">
                <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                    <div className="flex justify-around items-center h-16">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link key={link.label} href={link.href} className={cn(
                                    "flex flex-col items-center justify-center text-xs gap-1 transition-colors w-full h-full",
                                    isActive ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground"
                                )}>
                                    {link.icon}
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                        <SheetTrigger asChild>
                            <button className="flex flex-col items-center justify-center text-xs gap-1 text-muted-foreground hover:text-foreground transition-colors w-full h-full">
                                <Search className="h-6 w-6" />
                                <span>Search</span>
                            </button>
                        </SheetTrigger>
                    </div>
                    <SheetContent side="bottom" className="h-auto">
                        <SheetHeader>
                            <SheetTitle>Search by City</SheetTitle>
                        </SheetHeader>
                        <div className="flex items-center space-x-2 py-4">
                            <div className="grid flex-1 gap-2">
                                <Input
                                    id="city"
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

        </>
    )
}

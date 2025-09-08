
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
import { HardHat, Heart, Home, LogIn, LogOut, MessageSquare, Sparkles, User as UserIcon, Zap, UserPlus } from 'lucide-react';
import { useWishlist } from '@/context/WishlistProvider';
import { cn } from '@/lib/utils';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { logOut } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';

const navLinks = [
    { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
    { href: "/experiences", label: "Experiences", icon: <Zap className="h-5 w-5" /> },
    { href: "/services", label: "Services", icon: <HardHat className="h-5 w-5" /> },
]

export function Navbar() {
  const { wishlist } = useWishlist();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    await logOut();
    router.push('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  }

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300 bg-background shadow-sm"
    )}>
      <div className="container flex h-16 items-center justify-between mx-auto px-6">
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
        
        <nav className="hidden md:flex items-center justify-center space-x-1 text-sm font-medium">
          {navLinks.map((link) => (
            <Button key={link.label} asChild variant="ghost" className={cn(pathname === link.href ? "font-semibold text-accent" : "", "hover:bg-transparent hover:text-accent")}>
                <Link href={link.href} className="flex items-center gap-1">
                    {link.icon}
                    <span>{link.label}</span>
                </Link>
            </Button>
          ))}
        </nav>

        <div className="hidden md:flex items-center justify-end flex-1">
            <Link href="/work-in-progress">
              <Button variant="ghost" className="transition-colors font-bold text-foreground hover:bg-accent/10 rounded-full">
                Become a host
              </Button>
            </Link>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={user?.photoURL || "https://picsum.photos/100/100"} data-ai-hint="person face" alt="User avatar" />
                            <AvatarFallback>{user?.email?.[0].toUpperCase() || 'U'}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  {loading ? <DropdownMenuItem>Loading...</DropdownMenuItem> : (
                    <>
                      {user ? (
                        <>
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                              <Link href="/wishlist">
                                  <Heart className="mr-2" /> Wishlist ({wishlist.length})
                              </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                              <Link href="/recommendations">
                                  <Sparkles className="mr-2" /> For You
                              </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                              <UserIcon className="mr-2" /> Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                              <MessageSquare className="mr-2" /> Inbox
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                           <DropdownMenuItem onClick={handleLogout}>
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
                    </>
                  )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

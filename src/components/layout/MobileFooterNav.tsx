
'use client';

import { cn } from '@/lib/utils';
import { HardHat, Home, LogIn, User, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';


export function MobileFooterNav() {
    const pathname = usePathname();
    const { user } = useAuth();

    const navLinks = [
        { href: "/", label: "Home", icon: <Home className="h-6 w-6" /> },
        { href: "/experiences", label: "Experiences", icon: <Zap className="h-6 w-6" /> },
        { href: "/services", label: "Services", icon: <HardHat className="h-6 w-6" /> },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50">
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
            </div>
        </div>
    )
}

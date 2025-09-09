
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
        { href: "/", label: "Home", icon: <Home className="h-5 w-5" /> },
        { href: "/experiences", label: "Experiences", icon: <Zap className="h-5 w-5" /> },
        { href: "/services", label: "Services", icon: <HardHat className="h-5 w-5" /> },
    ];

    const isDetailPage = /^\/(listings|experiences|services)\/.+/.test(pathname);

    if (isDetailPage) {
        return null;
    }

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50">
            <div className="flex justify-around items-center h-16">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link key={link.label} href={link.href} className={cn(
                            "flex flex-col items-center justify-center text-[10px] gap-1 w-full h-full",
                            isActive ? "font-semibold" : "text-muted-foreground hover:text-foreground"
                        )}>
                            <span className={cn(isActive && 'text-accent')}>{link.icon}</span>
                            <span className={cn(isActive && 'bg-primary-gradient bg-clip-text text-transparent')}>{link.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}

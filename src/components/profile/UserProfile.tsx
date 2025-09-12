
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Award, Star, MessageSquare } from 'lucide-react';
import { properties } from '@/lib/data';
import ListingsGrid from '../listings/ListingsGrid';

interface UserProfileProps {
    user: {
        id: string;
        name: string;
        avatar: string;
        bio: string;
        location: string;
        since: string;
        reviews: number;
    }
}

export function UserProfile({ user }: UserProfileProps) {
    const userListings = properties.filter(p => p.host.name === user.name).slice(0, 3);
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <aside className="lg:col-span-1">
                <div className="p-6 rounded-xl border-2 text-center sticky top-24">
                    <Avatar className="h-32 w-32 mx-auto mb-4">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-sm text-muted-foreground mb-4">Joined in {user.since}</p>
                    
                    <div className="space-y-2 text-sm text-left">
                        <div className="flex items-center gap-2">
                            <Star className="h-4 w-4" />
                            <span>{user.reviews} reviews</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <Award className="h-4 w-4" />
                            <span>Identity verified</span>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    <h3 className="font-bold text-left mb-2">{user.name}'s confirmed information</h3>
                    <ul className="text-sm text-left space-y-1">
                        <li>✓ Email address</li>
                        <li>✓ Phone number</li>
                    </ul>

                    <Button variant="outline" className="w-full mt-6">Message {user.name}</Button>
                </div>
            </aside>
            <main className="lg:col-span-3">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Hi, I'm {user.name}</h1>
                <p className="text-muted-foreground mb-8">From {user.location}</p>

                <div className="prose max-w-none text-foreground">
                    <h3 className="font-bold">About</h3>
                    <p>{user.bio}</p>
                </div>
                
                <Separator className="my-8" />

                <div>
                    <h3 className="text-xl font-bold mb-4">Listings by {user.name}</h3>
                    {userListings.length > 0 ? (
                        <ListingsGrid listings={userListings} layout="grid" />
                    ) : (
                        <p className="text-muted-foreground">{user.name} doesn't have any public listings right now.</p>
                    )}
                </div>

                 <Separator className="my-8" />

                 <div>
                    <h3 className="text-xl font-bold mb-4">Reviews</h3>
                    <div className="flex items-center gap-2">
                        <Star className="h-6 w-6" />
                        <span className="text-xl font-semibold">{user.reviews} reviews</span>
                    </div>
                    {/* Placeholder for reviews */}
                 </div>
            </main>
        </div>
    )
}

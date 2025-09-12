
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Award, Star, MessageSquare, Instagram, Twitter, Facebook } from 'lucide-react';
import { properties } from '@/lib/data';
import ListingsGrid from '../listings/ListingsGrid';
import Link from 'next/link';

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
                    
                    <div>
                        <h3 className="font-bold text-left mb-2">Socials</h3>
                        <div className="flex items-center gap-4 text-muted-foreground">
                             <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                                <Instagram className="h-5 w-5" />
                            </a>
                             <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                                <Twitter className="h-5 w-5" />
                            </a>
                             <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                                <Facebook className="h-5 w-5" />
                            </a>
                             <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                                <svg height="20" width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M22.999 6.246c0-1.01-.933-1.838-2.086-1.838-1.01 0-1.802.587-2.124 1.192l-4.707-2.652c.23-.46.36-1 .36-1.57C14.442 1.258 13.184 0 11.85 0 10.516 0 9.258 1.258 9.258 2.378c0 .57.13 1.11.36 1.57L4.91 6.59c-.322-.605-1.114-1.192-2.124-1.192C1.753 5.4 1 6.246 1 7.256c0 .142.02.28.05.412-1.31 2.392-1.042 6.13 0 8.53.11.23.23.44.37.64v3.13c0 1.25 1.014 2.82 2.256 2.82 1.244 0 2.257-1.57 2.257-2.82v-3.13c.14-.2.26-.41.37-.64 1.043 2.4 1.312 6.138 0 8.53-.03.132-.05.27-.05.412 0 1.01.753 1.848 1.886 1.848 1.154 0 2.087-.83 2.087-1.848 0-.54-.12-1.05-.33-1.5l4.76-2.68s.26.02.32.02c.06 0 .26-.02.26-.02l4.76 2.68c-.21.45-.33.96-.33 1.5 0 1.018.933 1.848 2.087 1.848 1.152 0 1.905-.83 1.905-1.848 0-.142-.02-.28-.05-.412 1.31-2.392 1.042-6.13 0-8.53-.11-.23-.23-.44-.37-.64v-3.13c.14-.2.26-.41.37-.64 1.043-2.4 1.312-6.138 0-8.53.03-.132.05-.27.05-.412z"/></svg>
                            </a>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    <h3 className="font-bold text-left mb-2">{user.name}'s confirmed information</h3>
                    <ul className="text-sm text-left space-y-1">
                        <li>✓ Email address</li>
                        <li>✓ Phone number</li>
                    </ul>

                    <Button asChild variant="outline" className="w-full mt-6">
                        <Link href={`/inbox?conversationId=${user.id}`}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message {user.name}
                        </Link>
                    </Button>
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

    
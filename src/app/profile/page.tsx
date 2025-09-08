
'use client';

import { useAuth } from '@/context/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                  <Skeleton className="h-96 w-full" />
              </div>
              <div className="lg:col-span-3">
                  <Skeleton className="h-96 w-full" />
              </div>
          </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-12">
            {/* Left Sidebar */}
            <aside className="lg:col-span-1 mb-8 lg:mb-0">
                <div className="p-6 rounded-xl">
                    <div className="text-center mb-6">
                        <Avatar className="h-24 w-24 mx-auto mb-4">
                            <AvatarImage src={user.photoURL || 'https://picsum.photos/200'} data-ai-hint="person face" alt={user.displayName || 'User'} />
                            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <h2 className="text-2xl font-bold">{user.displayName || 'Welcome!'}</h2>
                        <p className="text-muted-foreground">Guest</p>
                    </div>

                    <Separator className="my-4" />

                    <nav className="space-y-2">
                        <Link href="/profile" className="block p-3 rounded-lg hover:bg-muted font-semibold">
                            About me
                        </Link>
                        <Link href="/work-in-progress" className="block p-3 rounded-lg hover:bg-muted">
                            Past trips
                        </Link>
                        <Link href="/work-in-progress" className="block p-3 rounded-lg hover:bg-muted">
                            Connections
                        </Link>
                    </nav>

                    <Separator className="my-4" />
                    
                    <div className="p-4 rounded-lg bg-muted/50 text-center">
                        <h3 className="font-bold">Become a host</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-3">It’s easy to start hosting and earn extra income.</p>
                        <Button asChild size="sm">
                            <Link href="/work-in-progress">Get started</Link>
                        </Button>
                    </div>

                    <Separator className="my-4" />

                    <nav className="space-y-2">
                        <Link href="/work-in-progress" className="block p-3 rounded-lg hover:bg-muted">
                            Account settings
                        </Link>
                        <Link href="/work-in-progress" className="block p-3 rounded-lg hover:bg-muted">
                            Get help
                        </Link>
                        <button onClick={signOut} className="w-full text-left p-3 rounded-lg hover:bg-muted text-destructive">
                            Log out
                        </button>
                    </nav>
                </div>
            </aside>

            {/* Right Content */}
            <main className="lg:col-span-3 pt-8 lg:pt-0 lg:border-t-0 border-t-2">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">About me</h1>
                    <Button variant="outline">Edit</Button>
                </div>
                
                <div className="p-8 rounded-xl">
                    <h2 className="text-xl font-bold mb-2">Complete your profile</h2>
                    <p className="text-sm text-muted-foreground mb-6">Your Airbnb profile is an important part of every reservation. Create yours to help other hosts and guests get to know you.</p>
                    
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">Email address</h3>
                            <p className="text-muted-foreground">{user.email}</p>
                        </div>
                         <div>
                            <h3 className="font-semibold">Phone number</h3>
                            <p className="text-muted-foreground">Not provided</p>
                        </div>
                         <div>
                            <h3 className="font-semibold">Identity verification</h3>
                            <p className="text-muted-foreground">Not verified</p>
                        </div>
                    </div>

                    <Button className="mt-6">Get started</Button>
                </div>
            </main>
        </div>
    </div>
  );
}

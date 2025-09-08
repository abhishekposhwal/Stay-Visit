
'use client';

import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { logOut } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { BedDouble, Calendar, Home, Mountain, Star } from 'lucide-react';
import Link from 'next/link';

const bookingHistory = [
  {
    id: '1',
    title: 'Sea-facing Apartment in Bandra',
    location: 'Mumbai, India',
    dates: 'Aug 15, 2024 - Aug 20, 2024',
    price: '₹40,000',
    image: 'https://picsum.photos/seed/1/200/150'
  },
  {
    id: '6',
    title: 'Royal Haveli Suite in Jaipur',
    location: 'Jaipur, India',
    dates: 'Jul 5, 2024 - Jul 10, 2024',
    price: '₹45,000',
    image: 'https://picsum.photos/seed/31/200/150'
  },
  {
    id: '17',
    title: 'Tea Estate Bungalow',
    location: 'Munnar, India',
    dates: 'May 1, 2024 - May 8, 2024',
    price: '₹70,000',
    image: 'https://picsum.photos/seed/97/200/150'
  }
]

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logOut();
    router.push('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  if (loading || !user) {
    return (
      <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-8 w-1/3" />
                        <Skeleton className="h-5 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader className="text-center">
                        <Skeleton className="w-24 h-24 mx-auto mb-4 rounded-full" />
                        <Skeleton className="h-8 w-48 mx-auto" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <Skeleton className="h-5 w-64 mx-auto" />
                        </div>
                        <Separator/>
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Booking History</CardTitle>
                        <CardDescription>View your past and upcoming reservations.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {bookingHistory.length > 0 ? (
                        bookingHistory.map((booking) => (
                           <Link href={`/bookings/${booking.id}`} key={booking.id} className="block hover:bg-muted/50 rounded-lg p-4 transition-colors">
                              <div className="flex items-start gap-4">
                                <img src={booking.image} data-ai-hint="building exterior" alt={booking.title} className="w-32 h-24 object-cover rounded-md"/>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg">{booking.title}</h3>
                                  <p className="text-sm text-muted-foreground">{booking.location}</p>
                                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                                      <Calendar className="w-4 h-4 mr-2" />
                                      <span>{booking.dates}</span>
                                  </div>
                                  <p className="font-semibold text-md mt-2">{booking.price}</p>
                                </div>
                                <Button variant="outline" size="sm">View Details</Button>
                              </div>
                           </Link>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <Home className="mx-auto h-12 w-12 text-muted-foreground" />
                           <h3 className="mt-4 text-lg font-semibold">No bookings yet</h3>
                           <p className="mt-1 text-sm text-muted-foreground">You haven't made any reservations yet. Start exploring to find your next stay!</p>
                           <Button asChild className="mt-4">
                                <Link href="/listings">Explore Stays</Link>
                            </Button>
                        </div>
                      )}
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1">
                <Card>
                    <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                        <AvatarImage src={user.photoURL || 'https://picsum.photos/200'} data-ai-hint="person face" />
                        <AvatarFallback>{user.displayName?.[0] || user.email?.[0].toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl">{user.displayName || user.email}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                        <p className="text-muted-foreground">{user.email}</p>
                        </div>
                        
                        <Separator />

                        <div className="grid gap-2 text-sm text-left">
                        <h3 className="font-semibold text-lg">Contact Information</h3>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Mobile Number</span>
                            <span>+91 98765 43210</span>
                        </div>
                        </div>

                        <div className="grid gap-2 text-sm text-left">
                        <h3 className="font-semibold text-lg">Address</h3>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">House No</span>
                            <span>123, Sunshine Apartments</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">City</span>
                            <span>Mumbai</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">State</span>
                            <span>Maharashtra</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Pin Code</span>
                            <span>400001</span>
                        </div>
                        </div>
                        
                        <Button onClick={handleLogout} variant="destructive" className="w-full !mt-8">
                            Log Out
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}

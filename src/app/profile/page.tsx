
'use client';

import { useAuth } from '@/context/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { BookingHistoryItem } from '@/components/profile/BookingHistoryItem';
import { properties } from '@/lib/data';

const bookingHistory = [
  {
    property: properties.find(p => p.id === '1'),
    checkIn: '2024-08-15',
    checkOut: '2024-08-20',
    total: 45000,
  },
    {
    property: properties.find(p => p.id === '5'),
    checkIn: '2024-07-01',
    checkOut: '2024-07-05',
    total: 65000,
  },
  {
    property: properties.find(p => p.id === '16'),
    checkIn: '2024-05-10',
    checkOut: '2024-05-12',
    total: 28000,
  }
]

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                  <Skeleton className="h-96 w-full" />
              </div>
              <div>
                  <Skeleton className="h-96 w-full" />
              </div>
          </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Booking History Column */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {bookingHistory.map((booking, index) => 
                    booking.property && <BookingHistoryItem key={index} booking={booking} />
                )}
            </CardContent>
          </Card>
        </div>

        {/* Profile Details Column */}
        <div>
            <Card>
                <CardHeader className="items-center text-center">
                <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={user.photoURL || 'https://picsum.photos/200'} data-ai-hint="person face" alt={user.displayName || 'User'} />
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl">{user.displayName || 'Welcome!'}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                    <div className='space-y-4 text-left'>
                        <div>
                            <p className="text-sm text-muted-foreground">Email</p>
                            <p className="text-base font-medium">{user.email}</p>
                        </div>
                        <Separator/>
                        <div>
                            <p className="text-sm text-muted-foreground">Mobile Number</p>
                            <p className="text-base font-medium">+91 98765 43210</p>
                        </div>
                        <Separator/>
                        <div>
                            <p className="text-sm text-muted-foreground">Address</p>
                            <div className="text-base font-medium">
                                <p>123, Sunshine Apartments</p>
                                <p>Dreamville, Wonderland - 123456</p>
                                <p>India</p>
                            </div>
                        </div>
                    </div>
                <Button onClick={signOut} variant="destructive">
                    Logout
                </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

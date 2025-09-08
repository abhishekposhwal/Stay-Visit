
'use client';

import { useAuth } from '@/context/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

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
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-32 w-32 rounded-full" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader className="items-center text-center">
          <Avatar className="h-32 w-32 mb-4">
            <AvatarImage src={user.photoURL || 'https://picsum.photos/200'} data-ai-hint="person face" alt={user.displayName || 'User'} />
            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl">{user.displayName || 'Welcome!'}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
            <div className='space-y-4 text-left'>
                <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-lg font-medium">{user.email}</p>
                </div>
                <Separator/>
                <div>
                    <p className="text-sm text-muted-foreground">Mobile Number</p>
                    <p className="text-lg font-medium">+91 98765 43210</p>
                </div>
                <Separator/>
                <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <div className="text-lg font-medium">
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
  );
}

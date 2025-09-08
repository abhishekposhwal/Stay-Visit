
'use client';

import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { logOut } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

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
         <Card className="max-w-md mx-auto">
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
    );
  }

  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md mx-auto">
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
  );
}

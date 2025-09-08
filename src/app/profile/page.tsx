
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-64" />
            <Skeleton className="h-10 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src={user.photoURL || 'https://picsum.photos/200'} data-ai-hint="person face" />
            <AvatarFallback>{user.displayName?.[0] || user.email?.[0].toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{user.displayName || user.email}</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">{user.email}</p>
            <Button onClick={handleLogout} variant="destructive" className="w-full">
                Log Out
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}

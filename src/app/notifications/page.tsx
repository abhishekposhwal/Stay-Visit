
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Bell, Calendar, MessageSquare, Star } from 'lucide-react';
import { mockNotifications } from '@/lib/notifications-data';

const notificationIcons = {
    booking: <Star className="h-5 w-5 text-yellow-500" />,
    message: <MessageSquare className="h-5 w-5 text-blue-500" />,
    recommendation: <Bell className="h-5 w-5 text-green-500" />,
    reminder: <Calendar className="h-5 w-5 text-red-500" />,
}

export default function NotificationsPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Notifications</h1>
        <Button variant="outline" size="sm">Mark all as read</Button>
      </div>

      <div className="space-y-4">
        {mockNotifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <div className={cn(
                "p-4 flex items-start gap-4 transition-colors rounded-lg",
                !notification.read ? "bg-muted/50" : "hover:bg-muted/50"
            )}>
                <div className="mt-1">
                    {notificationIcons[notification.type as keyof typeof notificationIcons]}
                </div>
                <div className="flex-grow">
                    <p className="text-sm">{notification.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                </div>
                <Avatar className="h-12 w-12 rounded-md">
                    <AvatarImage src={notification.image} className="rounded-md" />
                    <AvatarFallback className="rounded-md">{notification.type.charAt(0)}</AvatarFallback>
                </Avatar>
            </div>
            {index < mockNotifications.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
       {mockNotifications.length === 0 && (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-6 text-xl font-bold">No notifications yet</h2>
            <p className="mt-2 text-muted-foreground">You'll see updates about your trips and recommendations here.</p>
          </div>
        )}
    </div>
  );
}

// React is needed for Fragments
import * as React from 'react';

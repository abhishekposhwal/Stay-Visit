
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

type NotificationChannel = 'email' | 'mobile';
type NotificationType = 'messages' | 'reminders' | 'promotions' | 'policy';

type NotificationPreferences = Record<NotificationType, Record<NotificationChannel, boolean>>;

const notificationCategories = [
  {
    id: 'messages' as NotificationType,
    title: 'Messages',
    description: 'Receive messages from hosts, guests, or StayVisit support.',
  },
  {
    id: 'reminders' as NotificationType,
    title: 'Reminders',
    description: 'Get reminders about your bookings, reviews to write, and other tasks.',
  },
  {
    id: 'promotions' as NotificationType,
    title: 'Promotions and tips',
    description: 'Receive coupons, promotions, surveys, and travel tips from StayVisit.',
  },
  {
    id: 'policy' as NotificationType,
    title: 'Policy and community',
    description: 'Get updates on travel regulations and community initiatives.',
  },
];

export function NotificationSettings() {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    messages: { email: true, mobile: true },
    reminders: { email: true, mobile: true },
    promotions: { email: false, mobile: false },
    policy: { email: true, mobile: false },
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (
    type: NotificationType,
    channel: NotificationChannel
  ) => {
    setPreferences(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [channel]: !prev[type][channel],
      },
    }));
  };
  
  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
        console.log('Saved preferences:', preferences);
        toast({
            title: 'Preferences Saved',
            description: 'Your notification settings have been updated.',
        });
        setIsSaving(false);
    }, 1000);
  }

  return (
    <div>
        <h1 className="text-xl md:text-2xl font-bold mb-6">Notifications</h1>
        <Card className="border">
            <CardHeader>
                <CardTitle>Communication Preferences</CardTitle>
                <CardDescription>Choose how you want to be contacted. You can turn these off anytime.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 font-semibold text-sm">
                    <div className="col-span-1"></div>
                    <div className="col-span-1 text-center">Email</div>
                    <div className="col-span-1 text-center">Mobile</div>
                </div>
                {notificationCategories.map((category, index) => (
                    <div key={category.id}>
                        <div className="grid grid-cols-3 gap-4 items-center">
                            <div className="col-span-1">
                                <h3 className="font-semibold text-sm">{category.title}</h3>
                                <p className="text-xs text-muted-foreground">{category.description}</p>
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <Switch
                                    id={`${category.id}-email`}
                                    checked={preferences[category.id].email}
                                    onCheckedChange={() => handleToggle(category.id, 'email')}
                                    aria-label={`${category.title} email notifications`}
                                />
                            </div>
                             <div className="col-span-1 flex justify-center">
                                <Switch
                                    id={`${category.id}-mobile`}
                                    checked={preferences[category.id].mobile}
                                    onCheckedChange={() => handleToggle(category.id, 'mobile')}
                                    aria-label={`${category.title} mobile notifications`}
                                />
                            </div>
                        </div>
                        {index < notificationCategories.length - 1 && <Separator className="mt-6"/>}
                    </div>
                ))}

                 <Separator className="my-6"/>

                 <div className="flex justify-end">
                    <Button onClick={handleSave} disabled={isSaving} size="sm">
                        {isSaving ? 'Saving...' : 'Save Preferences'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}

    
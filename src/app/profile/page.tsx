
'use client';

import { useAuth } from '@/context/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BookingHistoryItem } from '@/components/profile/BookingHistoryItem';
import { properties } from '@/lib/data';
import { LifeBuoy, ShieldCheck, FileText, Settings, Wifi, Menu } from 'lucide-react';
import { AccountSettings } from '@/components/profile/AccountSettings';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const mockBookings = [
    {
        property: properties[0],
        checkIn: '2024-05-10',
        checkOut: '2024-05-15',
        total: 40000,
    },
    {
        property: properties[4],
        checkIn: '2024-03-20',
        checkOut: '2024-03-25',
        total: 75000,
    },
    {
        property: properties[8],
        checkIn: '2023-12-28',
        checkOut: '2024-01-02',
        total: 17500,
    },
];

const mockConnections = [
    { name: 'Priya', avatar: 'https://picsum.photos/seed/p1/100/100' },
    { name: 'Amit', avatar: 'https://picsum.photos/seed/p2/100/100' },
    { name: 'Sunita', avatar: 'https://picsum.photos/seed/p3/100/100' },
    { name: 'Vikram', avatar: 'https://picsum.photos/seed/p4/100/100' },
    { name: 'Neha', avatar: 'https://picsum.photos/seed/p5/100/100' },
    { name: 'Karan', avatar: 'https://picsum.photos/seed/p6/100/100' },
];

const helpTopics = [
    { 
        icon: <LifeBuoy className="h-6 w-6 text-accent" />,
        title: "Contact Support",
        description: "Get help from our support team 24/7.",
        link: "/work-in-progress"
    },
    { 
        icon: <ShieldCheck className="h-6 w-6 text-accent" />,
        title: "Safety Center",
        description: "Learn about our safety features and guidelines.",
        link: "/work-in-progress"
    },
    { 
        icon: <FileText className="h-6 w-6 text-accent" />,
        title: "Terms of Service",
        description: "Read our terms and conditions.",
        link: "/work-in-progress"
    },
    { 
        icon: <Settings className="h-6 w-6 text-accent" />,
        title: "Account Settings",
        description: "Manage your account preferences and notifications.",
        link: "/work-in-progress"
    },
]


export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('about');

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

  const SidebarContent = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <div className="p-6 rounded-xl">
        <div className="text-center mb-6">
            <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={user.photoURL || 'https://picsum.photos/200'} data-ai-hint="person face" alt={user.displayName || 'User'} />
                <AvatarFallback>{user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{user.displayName || 'Welcome!'}</h2>
            <p className="text-muted-foreground">Guest</p>
        </div>

        <Separator className="my-4" />

        <nav className="space-y-1">
            <button onClick={() => { setActiveTab('about'); onLinkClick?.(); }} className={cn("w-full text-left block px-3 py-1 rounded-lg transition-colors", activeTab === 'about' ? 'font-semibold' : '')}>
                About me
            </button>
            <button onClick={() => { setActiveTab('history'); onLinkClick?.(); }} className={cn("w-full text-left block px-3 py-1 rounded-lg transition-colors", activeTab === 'history' ? 'font-semibold' : '')}>
                Past trips
            </button>
            <button onClick={() => { setActiveTab('connections'); onLinkClick?.(); }} className={cn("w-full text-left block px-3 py-1 rounded-lg transition-colors", activeTab === 'connections' ? 'font-semibold' : '')}>
                Connections
            </button>
        </nav>

        <Separator className="my-4" />
        
        <div className="p-4 rounded-lg bg-muted/50 text-center">
            <h3 className="font-bold">Become a host</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-3">It’s easy to start hosting and earn extra income.</p>
            <Button asChild>
                <Link href="/work-in-progress">Get started</Link>
            </Button>
        </div>

        <Separator className="my-4" />

        <nav className="space-y-1">
            <button onClick={() => { setActiveTab('account'); onLinkClick?.(); }} className={cn("w-full text-left block px-3 py-1 rounded-lg transition-colors", activeTab === 'account' ? 'font-semibold' : '')}>
                Account settings
            </button>
            <button onClick={() => { setActiveTab('help'); onLinkClick?.(); }} className={cn("w-full text-left block px-3 py-1 rounded-lg transition-colors", activeTab === 'help' ? 'font-semibold' : '')}>
                Get help
            </button>
            <button onClick={signOut} className="w-full text-left px-3 py-1 rounded-lg text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors">
                Log out
            </button>
        </nav>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden mb-4">
                    <Menu className="mr-2 h-4 w-4" />
                    Profile Menu
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-80 p-0">
                <SidebarContent onLinkClick={() => {
                    const closeButton = document.querySelector('[data-radix-dialog-default-open=false]');
                    if (closeButton instanceof HTMLElement) {
                        closeButton.click();
                    }
                }} />
            </SheetContent>
        </Sheet>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-12">
            {/* Left Sidebar */}
            <aside className="hidden lg:block lg:col-span-1">
                <SidebarContent />
            </aside>

            {/* Right Content */}
            <main className="lg:col-span-3 pt-8 lg:pt-0 lg:border-t-0 border-t-2">
              {activeTab === 'about' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                      <h1 className="text-2xl font-bold">About me</h1>
                  </div>
                  
                  <div className="p-8 rounded-xl">
                      <h2 className="text-xl font-bold mb-2">Complete your profile</h2>
                      <p className="text-sm text-muted-foreground mb-6">Your Airbnb profile is an important part of every reservation. Create yours to help other hosts and guests get to know you.</p>
                      
                      <div className="space-y-4">
                          <div>
                              <h3 className="font-semibold text-sm">Email address</h3>
                              <p className="text-muted-foreground text-sm">{user.email}</p>
                          </div>
                          <div>
                              <h3 className="font-semibold text-sm">Phone number</h3>
                              <p className="text-muted-foreground text-sm">{user.phoneNumber || 'Not provided'}</p>
                          </div>
                          <div>
                              <h3 className="font-semibold text-sm">Address</h3>
                              <p className="text-muted-foreground text-sm">123, Sunshine Apartments, Dreamville, Wonderland - 123456, India</p>
                          </div>
                          <div>
                              <h3 className="font-semibold text-sm">Identity verification</h3>
                              <p className="text-muted-foreground text-sm">Not verified</p>
                          </div>
                      </div>

                      <Button variant="default" className="mt-6">Get started</Button>
                  </div>
                </>
              )}
              {activeTab === 'history' && (
                <div>
                  <h1 className="text-2xl font-bold mb-6">Past trips</h1>
                  <div className="space-y-6">
                    {mockBookings.map((booking, index) => (
                      <BookingHistoryItem key={index} booking={booking} />
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'connections' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                      <h1 className="text-2xl font-bold">Connections</h1>
                      <Button variant="default">Add friends</Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mockConnections.map((connection, index) => (
                          <div key={index} className="border rounded-lg p-4 flex items-center gap-4">
                              <Avatar>
                                  <AvatarImage src={connection.avatar} alt={connection.name} />
                                  <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="font-semibold">{connection.name}</span>
                          </div>
                      ))}
                  </div>
                </div>
              )}
              {activeTab === 'help' && (
                <div>
                    <h1 className="text-2xl font-bold mb-6">Get Help</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {helpTopics.map((topic, index) => (
                            <Link href={topic.link} key={index} className="border rounded-lg p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors">
                                {topic.icon}
                                <div>
                                    <h3 className="font-semibold">{topic.title}</h3>
                                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
              )}
              {activeTab === 'account' && (
                <AccountSettings user={user} />
              )}
            </main>
        </div>
    </div>
  );
}

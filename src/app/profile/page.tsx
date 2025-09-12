
'use client';

import { useAuth } from '@/context/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BookingHistoryItem } from '@/components/profile/BookingHistoryItem';
import { properties } from '@/lib/data';
import { LifeBuoy, ShieldCheck, FileText, Settings, Wifi, ArrowLeft, User, Lock, CreditCard, Bell, Shield, Smartphone, Monitor, Instagram, Twitter, Facebook, Plus, AlertCircle, Camera, Mail, Phone, CheckCircle, UserPlus, Repeat, Pencil, X, LogOut, ArrowRight, Banknote, Landmark, Eye } from 'lucide-react';
import { AccountSettings } from '@/components/profile/AccountSettings';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NotificationSettings } from '@/components/profile/NotificationSettings';
import { addDays } from 'date-fns';

const mockTransactions = [
    { type: 'payment', description: properties[0].title, date: '2024-05-10', amount: 40000 },
    { type: 'payment', description: properties[4].title, date: '2024-03-20', amount: 75000 },
    { type: 'payout', description: 'Host payout for "Heritage Haveli"', date: '2024-03-15', amount: 60000 },
    { type: 'payment', description: properties[8].title, date: '2023-12-28', amount: 17500 },
    { type: 'payment', description: properties[2].title, date: '2023-11-15', amount: 60000 },
    { type: 'payout', description: 'Host payout for "Sea-facing Apartment"', date: '2023-11-01', amount: 50000 },
    { type: 'payment', description: properties[6].title, date: '2023-09-01', amount: 20000 },
    { type: 'payment', description: properties[10].title, date: '2023-08-10', amount: 35000 },
    { type: 'payment', description: properties[12].title, date: '2023-07-01', amount: 90000 },
    { type: 'payout', description: 'Host payout for "Modern Tech Hub Penthouse"', date: '2023-06-28', amount: 72000 },
    { type: 'payment', description: properties[15].title, date: '2023-06-20', amount: 65000 },
    { type: 'payment', description: properties[18].title, date: '2023-05-01', amount: 37500 },
    { type: 'payment', description: properties[20].title, date: '2023-04-12', amount: 22500 },
    { type: 'payment', description: properties[22].title, date: '2023-02-15', amount: 55000 },
    { type: 'payment', description: properties[25].title, date: '2023-01-10', amount: 15000 },
];

const mockBookings = mockTransactions.filter(t => t.type === 'payment').map((t, i) => {
    const property = properties.find(p => p.title === t.description);
    const checkInDate = new Date(t.date);
    const nights = (i % 5) + 2; // Stay for 2 to 6 nights
    const checkOutDate = addDays(checkInDate, nights);

    return {
        property: property || properties[0], // fallback for safety
        checkIn: checkInDate.toISOString().split('T')[0],
        checkOut: checkOutDate.toISOString().split('T')[0],
        total: t.amount,
    }
});

const mockConnections = [
    { id: '1', name: 'Priya', avatar: 'https://picsum.photos/seed/p1/100/100' },
    { id: '2', name: 'Amit', avatar: 'https://picsum.photos/seed/p2/100/100' },
    { id: '3', name: 'Sunita', avatar: 'https://picsum.photos/seed/p3/100/100' },
    { id: '4', name: 'Vikram', avatar: 'https://picsum.photos/seed/p4/100/100' },
    { id: '5', name: 'Neha', avatar: 'https://picsum.photos/seed/p5/100/100' },
    { id: '6', name: 'Karan', avatar: 'https://picsum.photos/seed/p6/100/100' },
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
  const [activeView, setActiveView] = useState<'menu' | 'content'>('menu');
  const [activeSetting, setActiveSetting] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    address: '123, Sunshine Apartments, Dreamville, Wonderland - 123456, India',
    photoURL: '',
  });

  const [transactionPage, setTransactionPage] = useState(1);
  const transactionsPerPage = 10;
  const totalTransactionPages = Math.ceil(mockTransactions.length / transactionsPerPage);
  const transactionsToShow = mockTransactions.slice(
    (transactionPage - 1) * transactionsPerPage,
    transactionPage * transactionsPerPage
  );
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
        setUserInfo({
            displayName: user.displayName || 'Name not set',
            email: user.email || '',
            phoneNumber: user.phoneNumber || 'Not provided',
            address: '123, Sunshine Apartments, Dreamville, Wonderland - 123456, India',
            photoURL: user.photoURL || 'https://picsum.photos/200',
        })
    }
  }, [user, loading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserInfo(prev => ({...prev, [id]: value}));
  }

  const handleSave = () => {
    // Here you would typically call an API to save the user info
    console.log('Saving user info:', userInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
        setUserInfo({ // Reset to original values
            displayName: user.displayName || 'Name not set',
            email: user.email || '',
            phoneNumber: user.phoneNumber || 'Not provided',
            address: '123, Sunshine Apartments, Dreamville, Wonderland - 123456, India',
            photoURL: user.photoURL || 'https://picsum.photos/200',
        })
    }
    setIsEditing(false);
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
              setUserInfo(prev => ({...prev, photoURL: reader.result as string}));
          };
          reader.readAsDataURL(file);
      }
  }

  const handleMenuClick = (tab: string) => {
    setActiveTab(tab);
    setActiveSetting(null); // Reset setting when changing main tab
    setActiveView('content');
  };

  const handleSettingClick = (setting: string) => {
    setActiveTab('account');
    setActiveSetting(setting);
    setActiveView('content');
  }

  const handleBackToMenu = () => {
    if (activeSetting) {
        setActiveSetting(null);
    } else {
        setActiveView('menu');
    }
  }

  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 pb-8">
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

  const SidebarContent = () => (
    <div className="p-6 rounded-xl">
        <div className="text-center mb-4">
            <div className="w-32 h-32 rounded-full p-1 bg-primary-gradient mx-auto mb-4">
                <Avatar className="h-full w-full border-2 border-white">
                    <AvatarImage src={userInfo.photoURL} data-ai-hint="person face" alt={user.displayName || 'User'} />
                    <AvatarFallback>{user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
            </div>
            <h2 className="text-xl font-bold">{user.displayName || 'Welcome!'}</h2>
            <p className="text-sm text-muted-foreground">Guest</p>
        </div>

        <Separator className="my-2" />

        <nav>
            <button onClick={() => handleMenuClick('about')} className={cn("w-full text-left block px-3 py-1 rounded-lg transition-colors text-sm", activeTab === 'about' && !activeSetting ? 'font-semibold' : '')}>
                About me
            </button>
            <button onClick={() => handleMenuClick('history')} className={cn("w-full text-left block px-3 py-1 rounded-lg transition-colors text-sm", activeTab === 'history' ? 'font-semibold' : '')}>
                Past trips
            </button>
            <button onClick={() => handleMenuClick('connections')} className={cn("w-full text-left block px-3 py-1 rounded-lg transition-colors text-sm", activeTab === 'connections' ? 'font-semibold' : '')}>
                Connections
            </button>
        </nav>

        <Separator className="my-2" />
        
        <div className="p-4 rounded-xl bg-primary-gradient text-center text-white">
            <h3 className="font-bold">Become a host</h3>
            <p className="text-xs text-white/80 mt-1 mb-3">It’s easy to start hosting and earn extra income.</p>
            <div className="flex justify-center">
                <Button asChild variant="outline" size="sm" className="bg-white/20 text-white border-white/50 hover:bg-white/30">
                    <Link href="/work-in-progress">Get started <ArrowRight /></Link>
                </Button>
            </div>
        </div>

        <Separator className="my-2" />

        <nav className="space-y-1">
            <button 
                onClick={() => handleMenuClick('account')} 
                className={cn(
                    "w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg transition-colors text-sm", 
                    activeTab === 'account' && !activeSetting ? 'font-semibold bg-muted' : 'hover:bg-muted/50'
                )}
            >
                <Settings className="h-5 w-5" />
                Account settings
            </button>
            <button 
                onClick={() => handleMenuClick('help')} 
                className={cn(
                    "w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg transition-colors text-sm", 
                    activeTab === 'help' ? 'font-semibold bg-muted' : 'hover:bg-muted/50'
                )}
            >
                <LifeBuoy className="h-5 w-5" />
                Get help
            </button>
            <button 
                onClick={signOut} 
                className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-lg text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors text-sm"
            >
                <LogOut className="h-5 w-5" />
                Log out
            </button>
        </nav>
    </div>
  );

  const renderContent = () => {
    if (activeSetting) {
        if (activeSetting === 'personal-info') {
            return (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-xl md:text-2xl font-bold">Personal Info</h1>
                         {!isEditing && (
                            <Button variant="default" size="sm" onClick={() => setIsEditing(true)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Profile
                            </Button>
                         )}
                    </div>
                    <div className="space-y-6">
                        <div className="p-6 md:p-8 rounded-xl border">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="relative">
                                    <Avatar className="h-24 w-24 border-2 border-white">
                                        <AvatarImage src={userInfo.photoURL} alt="User avatar" />
                                        <AvatarFallback>{userInfo.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    {isEditing && (
                                        <Button 
                                            variant="outline" 
                                            size="icon" 
                                            className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Camera className="h-4 w-4" />
                                            <span className="sr-only">Upload photo</span>
                                        </Button>
                                    )}
                                     <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handlePhotoUpload} 
                                    />
                                </div>
                                <div className="text-center sm:text-left flex-grow">
                                    {isEditing ? (
                                        <div className="space-y-2">
                                            <Label htmlFor="displayName" className="text-xs font-semibold">Name</Label>
                                            <Input id="displayName" value={userInfo.displayName} onChange={handleInputChange} className="border text-lg font-bold p-2" />
                                        </div>
                                    ) : (
                                        <h3 className="font-bold text-2xl">{userInfo.displayName}</h3>
                                    )}
                                    <p className="text-muted-foreground text-sm">{userInfo.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 rounded-xl border">
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Label htmlFor="email" className="font-semibold">Email</Label>
                                        {isEditing ? (
                                            <Input id="email" type="email" value={userInfo.email} onChange={handleInputChange} className="border mt-1" />
                                        ) : (
                                            <p className="text-muted-foreground text-sm">{userInfo.email}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                                        <CheckCircle className="h-5 w-5" />
                                        <span>Verified</span>
                                    </div>
                                </div>
                                <Separator />
                                 <div className="flex justify-between items-start">
                                    <div>
                                        <Label htmlFor="phoneNumber" className="font-semibold">Phone number</Label>
                                        {isEditing ? (
                                            <Input id="phoneNumber" type="tel" value={userInfo.phoneNumber} onChange={handleInputChange} className="border mt-1" pattern="^\+?[1-9]\d{1,14}$" maxLength={15} />
                                        ) : (
                                            <p className="text-muted-foreground text-sm">{userInfo.phoneNumber}</p>
                                        )}
                                    </div>
                                     {userInfo.phoneNumber !== "Not provided" ? (
                                        <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                                           <CheckCircle className="h-5 w-5" />
                                           <span>Verified</span>
                                        </div>
                                    ) : (
                                         <div className="flex items-center gap-2">
                                             <Button variant="destructive" size="sm"><AlertCircle className="mr-2 h-4 w-4"/>Verify</Button>
                                         </div>
                                    )}
                                </div>
                                <Separator />
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Label htmlFor="address" className="font-semibold">Address</Label>
                                        {isEditing ? (
                                            <Input id="address" value={userInfo.address} onChange={handleInputChange} className="border mt-1" />
                                        ) : (
                                            <p className="text-muted-foreground text-sm">{userInfo.address}</p>
                                        )}
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">Identity verification</p>
                                        <p className="text-xs text-muted-foreground mt-1">Verify your identity to build trust in the community.</p>
                                    </div>
                                    <Button variant="destructive" size="sm"><AlertCircle className="mr-2 h-4 w-4"/>Verify</Button>
                                </div>
                            </div>
                        </div>

                         {isEditing && (
                            <div className="flex justify-end gap-2 mt-4">
                                <Button onClick={handleSave} size="sm">Save changes</Button>
                                <Button variant="outline" onClick={handleCancel} size="sm">Cancel</Button>
                            </div>
                        )}
                    </div>
                </div>
            )
        }

        if (activeSetting === 'login-security') {
            return (
                <div>
                    <h1 className="text-xl md:text-2xl font-bold mb-6">Login &amp; Security</h1>
                    <div className="space-y-6">
                        <div className="p-6 md:p-8 rounded-xl border">
                            <h2 className="font-bold text-lg mb-4">Login</h2>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-sm">Password</p>
                                    <p className="text-muted-foreground text-xs mt-1">Last updated 2 months ago</p>
                                </div>
                                <Button size="sm">
                                    <Pencil />
                                    Update
                                </Button>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 rounded-xl border">
                            <h2 className="font-bold text-lg mb-4">Social accounts</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path><path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path></svg>
                                        <div>
                                            <p className="font-semibold text-sm">Google</p>
                                            <p className="text-muted-foreground text-xs mt-1">Connected</p>
                                        </div>
                                    </div>
                                    <Button variant="destructive" size="sm">
                                        <X />
                                        Disconnect
                                    </Button>
                                </div>
                                <Separator/>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <Instagram className="h-6 w-6 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold text-sm">Instagram</p>
                                            <p className="text-muted-foreground text-xs mt-1">Not connected</p>
                                        </div>
                                    </div>
                                    <Button size="sm">
                                        <Plus />
                                        Connect
                                    </Button>
                                </div>
                                <Separator/>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <Twitter className="h-6 w-6 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold text-sm">Twitter</p>
                                            <p className="text-muted-foreground text-xs mt-1">Not connected</p>
                                        </div>
                                    </div>
                                    <Button size="sm">
                                        <Plus />
                                        Connect
                                    </Button>
                                </div>
                                <Separator/>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <Facebook className="h-6 w-6 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold text-sm">Facebook</p>
                                            <p className="text-muted-foreground text-xs mt-1">Not connected</p>
                                        </div>
                                    </div>
                                    <Button size="sm">
                                        <Plus />
                                        Connect
                                    </Button>
                                </div>
                                <Separator/>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground" fill="currentColor"><path d="M22.999 6.246c0-1.01-.933-1.838-2.086-1.838-1.01 0-1.802.587-2.124 1.192l-4.707-2.652c.23-.46.36-1 .36-1.57C14.442 1.258 13.184 0 11.85 0 10.516 0 9.258 1.258 9.258 2.378c0 .57.13 1.11.36 1.57L4.91 6.59c-.322-.605-1.114-1.192-2.124-1.192C1.753 5.4 1 6.246 1 7.256c0 .142.02.28.05.412-1.31 2.392-1.042 6.13 0 8.53.11.23.23.44.37.64v3.13c0 1.25 1.014 2.82 2.256 2.82 1.244 0 2.257-1.57 2.257-2.82v-3.13c.14-.2.26-.41.37-.64 1.043 2.4 1.312 6.138 0 8.53-.03.132-.05.27-.05.412 0 1.01.753 1.848 1.886 1.848 1.154 0 2.087-.83 2.087-1.848 0-.54-.12-1.05-.33-1.5l4.76-2.68s.26.02.32.02c.06 0 .26-.02.26-.02l4.76 2.68c-.21.45-.33.96-.33 1.5 0 1.018.933 1.848 2.087 1.848 1.152 0 1.905-.83 1.905-1.848 0-.142-.02-.28-.05-.412 1.31-2.392 1.042-6.13 0-8.53-.11-.23-.23-.44-.37-.64v-3.13c.14-.2.26-.41.37-.64 1.043-2.4 1.312-6.138 0-8.53.03-.132.05-.27.05-.412z"/></svg>
                                        <div>
                                            <p className="font-semibold text-sm">Snapchat</p>
                                            <p className="text-muted-foreground text-xs mt-1">Not connected</p>
                                        </div>
                                    </div>
                                    <Button size="sm">
                                        <Plus />
                                        Connect
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 rounded-xl border">
                            <h2 className="font-bold text-lg mb-6">Device history</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <Monitor className="h-6 w-6 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold text-sm">Chrome on MacOS</p>
                                            <p className="text-muted-foreground text-xs mt-1">Active now</p>
                                        </div>
                                    </div>
                                    <Button variant="destructive" size="sm">
                                        <LogOut />
                                        Log out
                                    </Button>
                                </div>
                                <Separator/>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <Smartphone className="h-6 w-6 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold text-sm">iPhone App</p>
                                            <p className="text-muted-foreground text-xs mt-1">2 days ago</p>
                                        </div>
                                    </div>
                                    <Button variant="destructive" size="sm">
                                        <LogOut />
                                        Log out
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        if (activeSetting === 'payments') {
            return (
                <div>
                    <h1 className="text-xl md:text-2xl font-bold mb-6">Payments &amp; Payouts</h1>
                    <div className="space-y-8">
                        <div className="p-6 md:p-8 rounded-xl border">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-bold text-lg">Payment Methods</h2>
                                <Button variant="default" size="sm">
                                    <Plus className="h-4 w-4" /> Add payment method
                                </Button>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="w-full bg-primary-gradient p-6 rounded-xl text-white shadow-lg flex flex-col justify-between h-48 max-w-xs">
                                        <div className="flex justify-between items-start">
                                            <span className="text-lg font-semibold">Credit Card</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 38 24" fill="white" className="-mt-2"><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3zM21.5 16h-5c-.3 0-.5-.2-.5-.5v-7c0-.3.2-.5.5-.5h5c.3 0 .5.2.5.5v7c0 .3-.2.5-.5.5zm-14-5.5c0-.3.2-.5.5-.5h2.8l2.2-5.9c.1-.3 0-.6-.3-.7-.2-.1-.5 0-.6.2L14 10.4V8.5c0-.3.2-.5.5-.5h2c.3 0 .5.2.5.5v2.2c0 .2-.1.4-.3.5-.2.1-.4.1-.6-.1l-2.2-1.5-2.1 5.9v.5c0 .3.2.5.5.5h4.3c.3 0 .5-.2.5-.5v-2c0-.3-.2-.5-.5-.5h-2.3l.8-2.3 2.1 1.5c.3.2.6.2.8 0l.9-2.3c.1-.2 0-.5-.2-.6s-.5-.1-.6.1l-.8-2.2-1.2-1.1c-.2-.1-.4-.1-.6 0-.2.1-.3.3-.2.5l1.4 3.9h-3.1c-.3 0-.5.2-.5.5v.4c0 .3.2.5.5.5H13c.3 0 .5-.2.5-.5v-2.2c0 .2-.1.4-.3.5-.2.1-.4.1-.6-.1l-2.2-1.5-2.1 5.9v.5c0 .3.2.5.5.5h4.3c.3 0 .5-.2.5-.5v2c0 .3.2.5.5.5h2.3l-.8 2.3-2.1-1.5c-.3-.2-.6-.2-.8 0l-.9 2.3c-.1.2 0 .5.2.6s.5.1.6-.1l.8-2.2 1.2 1.1c-.2-.1-.4-.1-.6 0-.2.1-.3.3-.2.5l1.4 3.9h-3.1c-.3 0-.5.2-.5.5v.4c0 .3.2.5.5.5H30c.3 0 .5-.2.5-.5v-5.5z"></path></svg>
                                        </div>
                                        <div className="text-lg font-mono tracking-widest text-center pt-2">
                                            **** **** **** 4242
                                        </div>
                                        <div className="flex justify-between items-end text-xs font-mono">
                                            <div>
                                                <p className="uppercase">Card Holder</p>
                                                <p className="uppercase font-semibold">{user?.displayName}</p>
                                            </div>
                                            <div>
                                                <p className="uppercase">Expires</p>
                                                <p className="font-semibold">12/26</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Button variant="default" size="sm">
                                            <Pencil />
                                            Update
                                        </Button>
                                        <Button variant="destructive" size="sm">
                                            <X />
                                            Remove
                                        </Button>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between gap-4">
                                    <div className="border rounded-xl p-4 flex-grow flex items-center gap-4">
                                        <Banknote className="h-8 w-8 text-muted-foreground" />
                                        <div className="flex-grow">
                                            <p className="font-semibold text-sm">UPI</p>
                                            <p className="text-muted-foreground text-sm">{user?.displayName?.toLowerCase().replace(' ','.')}@okhdfcbank</p>
                                        </div>
                                    </div>
                                     <div className="flex flex-col gap-2">
                                        <Button variant="default" size="sm">
                                            <Pencil />
                                            Update
                                        </Button>
                                        <Button variant="destructive" size="sm">
                                            <X />
                                            Remove
                                        </Button>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between gap-4">
                                    <div className="border rounded-xl p-4 flex-grow flex items-center gap-4">
                                        <Landmark className="h-8 w-8 text-muted-foreground" />
                                        <div className="flex-grow">
                                            <p className="font-semibold text-sm">Bank Account</p>
                                            <p className="text-muted-foreground text-sm">State Bank of India (**** 1234)</p>
                                        </div>
                                    </div>
                                     <div className="flex flex-col gap-2">
                                        <Button variant="default" size="sm">
                                            <Pencil />
                                            Update
                                        </Button>
                                        <Button variant="destructive" size="sm">
                                            <X />
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 rounded-xl border">
                            <h2 className="font-bold text-lg mb-4">Transaction History</h2>
                            <div className="overflow-x-auto rounded-lg border">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 font-semibold">Description</th>
                                            <th scope="col" className="px-6 py-3 font-semibold">Date</th>
                                            <th scope="col" className="px-6 py-3 font-semibold text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactionsToShow.map((transaction, i) => (
                                            <tr key={i} className="border-b last:border-b-0 even:bg-muted/30 hover:bg-muted/50">
                                                <td className="px-6 py-4 font-semibold">{transaction.description}</td>
                                                <td className="px-6 py-4 text-muted-foreground">{transaction.date}</td>
                                                <td className={cn(
                                                    "px-6 py-4 font-semibold text-right",
                                                    transaction.type === 'payout' ? 'text-green-600' : 'text-red-600'
                                                )}>
                                                    {transaction.type === 'payout' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {mockTransactions.length > transactionsPerPage && (
                                <div className="flex justify-between items-center mt-4">
                                    <Button 
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => setTransactionPage(prev => Math.max(1, prev - 1))}
                                        disabled={transactionPage === 1}
                                    >
                                        <ArrowLeft /> Previous
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                        Page {transactionPage} of {totalTransactionPages}
                                    </span>
                                    <Button 
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setTransactionPage(prev => Math.min(totalTransactionPages, prev + 1))}
                                        disabled={transactionPage === totalTransactionPages}
                                    >
                                        Next <ArrowRight />
                                    </Button>
                                </div>
                            )}
                        </div>

                         <div className="p-6 md:p-8 rounded-xl border">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-bold text-lg">Payout Methods</h2>
                                <Button variant="default" size="sm">
                                    <Plus className="h-4 w-4" /> Add Payout Method
                                </Button>
                            </div>
                            <div className="relative p-4 bg-background rounded-md border">
                                <Button variant="destructive" size="sm" className="absolute top-2 right-2">
                                    <X className="h-4 w-4" />
                                    Remove
                                </Button>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="font-semibold text-sm">Account Holder Name</p>
                                        <p className="text-muted-foreground text-sm">{user.displayName}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Bank Name</p>
                                        <p className="text-muted-foreground text-sm">State Bank of India</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">Account Number</p>
                                        <p className="text-muted-foreground text-sm">**** **** 1234</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">IFSC Code</p>
                                        <p className="text-muted-foreground text-sm">SBIN0001234</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        if (activeSetting === 'notifications') {
            return <NotificationSettings />;
        }

        if (activeSetting === 'privacy') {
            return (
                <div>
                    <h1 className="text-xl md:text-2xl font-bold mb-6">Privacy &amp; Sharing</h1>
                    <div className="p-6 md:p-8 rounded-xl border text-center">
                        <p className="text-muted-foreground">This section is a work in progress.</p>
                    </div>
                </div>
            );
        }

        return null;
    }

    switch (activeTab) {
      case 'about':
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-6">Confirmed Information</h1>
            <div className="p-6 md:p-8 rounded-xl border">
                <ul className="space-y-4">
                    <li className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                        <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-semibold">Email address</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                        <CheckCircle className="h-5 w-5" />
                        <span>Verified</span>
                        </div>
                    </li>
                    <Separator />
                    <li className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                        <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-semibold">Phone number</p>
                            <p className="text-sm text-muted-foreground">{user.phoneNumber || 'Not provided'}</p>
                        </div>
                        </div>
                        {user.phoneNumber ? (
                        <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                            <CheckCircle className="h-5 w-5" />
                            <span>Verified</span>
                        </div>
                        ) : (
                        <Button variant="destructive" size="sm">
                            <AlertCircle className="mr-2 h-4 w-4" /> Verify
                        </Button>
                        )}
                    </li>
                    <Separator />
                    <li className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                        <div className="flex items-center gap-4">
                        <Shield className="h-6 w-6 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-semibold">Identity verification</p>
                            <p className="text-sm text-muted-foreground">Show your ID to build trust</p>
                        </div>
                        </div>
                        <Button variant="destructive" size="sm">
                        <AlertCircle className="mr-2 h-4 w-4" /> Verify
                        </Button>
                    </li>
                </ul>
            </div>
          </div>
        );
      case 'history':
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-6">Past trips</h1>
            <div className="flex flex-col gap-6">
              {mockBookings.map((booking, index) => (
                <BookingHistoryItem key={index} booking={booking} />
              ))}
            </div>
          </div>
        );
      case 'connections':
        return (
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-xl md:text-2xl font-bold">Connections</h1>
                    <Button variant="default" size="sm">
                        <UserPlus className="mr-1 h-4 w-4" /> Add friends
                    </Button>
                </div>
                <div className="space-y-4">
                    {mockConnections.map((connection) => (
                        <div key={connection.id} className="border rounded-lg p-4 flex items-center justify-between hover:bg-muted/50 transition-colors duration-200">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={connection.avatar} alt={connection.name} />
                                    <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold">{connection.name}</h3>
                                </div>
                            </div>
                            <Button asChild variant="secondary" size="sm">
                                <Link href={`/profile/${connection.id}`}>
                                    <Eye className="mr-1 h-4 w-4" />
                                    View Profile
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        );
      case 'help':
        return (
          <div>
              <h1 className="text-xl md:text-2xl font-bold mb-6">Get Help</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {helpTopics.map((topic, index) => (
                      <Link href={topic.link} key={index} className="border rounded-lg p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors">
                          {topic.icon}
                          <div>
                              <h3 className="font-semibold text-sm">{topic.title}</h3>
                              <p className="text-xs text-muted-foreground">{topic.description}</p>
                          </div>
                      </Link>
                  ))}
              </div>
          </div>
        );
      case 'account':
        return <AccountSettings user={user} onSettingClick={handleSettingClick} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-12">
            {/* Left Sidebar */}
            <aside className={cn(
                "lg:col-span-1",
                activeView === 'menu' ? 'block px-4' : 'hidden lg:block'
            )}>
                <SidebarContent />
            </aside>

            {/* Right Content */}
            <main className={cn(
                "lg:col-span-3 lg:pt-8",
                 activeView === 'content' ? 'block px-4 lg:px-0' : 'hidden lg:block'
            )}>
                <Button variant="ghost" className="lg:hidden mb-4 -ml-4" onClick={handleBackToMenu}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
              
              {renderContent()}

            </main>
        </div>
    </div>
  );
}

    
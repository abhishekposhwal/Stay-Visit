
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
import { LifeBuoy, ShieldCheck, FileText, Settings, Wifi, ArrowLeft, User, Lock, CreditCard, Bell, Shield, Smartphone, Monitor, Instagram, Twitter, Facebook, Plus, AlertCircle } from 'lucide-react';
import { AccountSettings } from '@/components/profile/AccountSettings';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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

const mockBookings = mockTransactions.filter(t => t.type === 'payment').map(t => {
    const property = properties.find(p => p.title === t.description);
    return {
        property: property || properties[0], // fallback for safety
        checkIn: t.date,
        checkOut: t.date,
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
  });

  const [transactionPage, setTransactionPage] = useState(1);
  const transactionsPerPage = 10;
  const totalTransactionPages = Math.ceil(mockTransactions.length / transactionsPerPage);
  const transactionsToShow = mockTransactions.slice(
    (transactionPage - 1) * transactionsPerPage,
    transactionPage * transactionsPerPage
  );


  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (user) {
        setUserInfo({
            displayName: user.displayName || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || 'Not provided',
            address: '123, Sunshine Apartments, Dreamville, Wonderland - 123456, India',
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
            displayName: user.displayName || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || 'Not provided',
            address: '123, Sunshine Apartments, Dreamville, Wonderland - 123456, India',
        })
    }
    setIsEditing(false);
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
            <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={user.photoURL || 'https://picsum.photos/200'} data-ai-hint="person face" alt={user.displayName || 'User'} />
                <AvatarFallback>{user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
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
        
        <div className="p-3 rounded-lg bg-muted/50 text-center">
            <h3 className="font-bold text-sm">Become a host</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-2">It’s easy to start hosting and earn extra income.</p>
            <Button asChild>
                <Link href="/work-in-progress">Get started</Link>
            </Button>
        </div>

        <Separator className="my-2" />

        <nav>
            <button onClick={() => handleMenuClick('account')} className={cn("w-full text-left block px-3 py-1 rounded-lg transition-colors text-sm", activeTab === 'account' && !activeSetting ? 'font-semibold' : '')}>
                Account settings
            </button>
            <button onClick={() => handleMenuClick('help')} className={cn("w-full text-left block px-3 py-1 rounded-lg transition-colors text-sm", activeTab === 'help' ? 'font-semibold' : '')}>
                Get help
            </button>
            <button onClick={signOut} className="w-full text-left px-3 py-1 rounded-lg text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors text-sm">
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
                            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Edit</Button>
                        )}
                    </div>
                    <div className="p-6 md:p-8 rounded-xl border">
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="displayName" className="text-sm font-semibold">Name</Label>
                                {isEditing ? (
                                    <Input id="displayName" value={userInfo.displayName} onChange={handleInputChange} />
                                ) : (
                                    <p className="text-muted-foreground text-sm">{userInfo.displayName || 'Not provided'}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                                 {isEditing ? (
                                    <Input id="email" type="email" value={userInfo.email} onChange={handleInputChange} />
                                ) : (
                                    <p className="text-muted-foreground text-sm">{userInfo.email}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="phoneNumber" className="text-sm font-semibold">Phone number</Label>
                                 {isEditing ? (
                                    <Input id="phoneNumber" value={userInfo.phoneNumber} onChange={handleInputChange} />
                                ) : (
                                    <p className="text-muted-foreground text-sm">{userInfo.phoneNumber}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="address" className="text-sm font-semibold">Address</Label>
                                 {isEditing ? (
                                    <Input id="address" value={userInfo.address} onChange={handleInputChange} />
                                ) : (
                                    <p className="text-muted-foreground text-sm">{userInfo.address}</p>
                                )}
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-sm">Identity verification</p>
                                    <p className="text-muted-foreground text-sm">Not verified</p>
                                </div>
                                <Button variant="outline" size="sm">Verify</Button>
                            </div>

                             {isEditing && (
                                <div className="flex justify-end gap-2 mt-4">
                                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                                    <Button onClick={handleSave}>Save</Button>
                                </div>
                            )}
                        </div>
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
                                    <p className="text-muted-foreground text-xs">Last updated 2 months ago</p>
                                </div>
                                <Button variant="outline" size="sm">Update</Button>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 rounded-xl border space-y-4">
                            <h2 className="font-bold text-lg">Social accounts</h2>
                             <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path><path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path></svg>
                                    <div>
                                        <p className="font-semibold text-sm">Google</p>
                                        <p className="text-muted-foreground text-xs">Connected</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Disconnect</Button>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <Instagram className="h-6 w-6" />
                                    <div>
                                        <p className="font-semibold text-sm">Instagram</p>
                                        <p className="text-muted-foreground text-xs">Not connected</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Connect</Button>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <Twitter className="h-6 w-6" />
                                    <div>
                                        <p className="font-semibold text-sm">Twitter</p>
                                        <p className="text-muted-foreground text-xs">Not connected</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Connect</Button>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <Facebook className="h-6 w-6" />
                                    <div>
                                        <p className="font-semibold text-sm">Facebook</p>
                                        <p className="text-muted-foreground text-xs">Not connected</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Connect</Button>
                            </div>
                             <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M22.999 6.246c0-1.01-.933-1.838-2.086-1.838-1.01 0-1.802.587-2.124 1.192l-4.707-2.652c.23-.46.36-1 .36-1.57C14.442 1.258 13.184 0 11.85 0 10.516 0 9.258 1.258 9.258 2.378c0 .57.13 1.11.36 1.57L4.91 6.59c-.322-.605-1.114-1.192-2.124-1.192C1.753 5.4 1 6.246 1 7.256c0 .142.02.28.05.412-1.31 2.392-1.042 6.13 0 8.53.11.23.23.44.37.64v3.13c0 1.25 1.014 2.82 2.256 2.82 1.244 0 2.257-1.57 2.257-2.82v-3.13c.14-.2.26-.41.37-.64 1.043 2.4 1.312 6.138 0 8.53-.03.132-.05.27-.05.412 0 1.01.753 1.848 1.886 1.848 1.154 0 2.087-.83 2.087-1.848 0-.54-.12-1.05-.33-1.5l4.76-2.68s.26.02.32.02c.06 0 .26-.02.26-.02l4.76 2.68c-.21.45-.33.96-.33 1.5 0 1.018.933 1.848 2.087 1.848 1.152 0 1.905-.83 1.905-1.848 0-.142-.02-.28-.05-.412 1.31-2.392 1.042-6.13 0-8.53-.11-.23-.23-.44-.37-.64v-3.13c.14-.2.26-.41.37-.64 1.043-2.4 1.312-6.138 0-8.53.03-.132.05-.27.05-.412z"/></svg>
                                    <div>
                                        <p className="font-semibold text-sm">Snapchat</p>
                                        <p className="text-muted-foreground text-xs">Not connected</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Connect</Button>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 rounded-xl border">
                            <h2 className="font-bold text-lg mb-4">Device history</h2>
                             <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-4">
                                    <Monitor className="h-6 w-6 text-muted-foreground" />
                                    <div>
                                        <p className="font-semibold text-sm">Chrome on MacOS</p>
                                        <p className="text-muted-foreground text-xs">Active now</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Log out</Button>
                            </div>
                             <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <Smartphone className="h-6 w-6 text-muted-foreground" />
                                    <div>
                                        <p className="font-semibold text-sm">iPhone App</p>
                                        <p className="text-muted-foreground text-xs">2 days ago</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Log out</Button>
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
                            <h2 className="font-bold text-lg mb-4">Payment Methods</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-6 w-6" />
                                        <div>
                                            <p className="font-semibold text-sm">Visa **** 4242</p>
                                            <p className="text-muted-foreground text-xs">Expires 12/26</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">Remove</Button>
                                </div>
                                <Button variant="outline" className="w-full">
                                    <Plus className="h-4 w-4 mr-2" /> Add payment method
                                </Button>
                            </div>
                        </div>

                        <div className="p-6 md:p-8 rounded-xl border">
                            <h2 className="font-bold text-lg mb-4">Transaction History</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-muted-foreground uppercase">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Description</th>
                                            <th scope="col" className="px-6 py-3">Date</th>
                                            <th scope="col" className="px-6 py-3 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transactionsToShow.map((transaction, i) => (
                                            <tr key={i} className="border-b">
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
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setTransactionPage(prev => Math.max(1, prev - 1))}
                                        disabled={transactionPage === 1}
                                    >
                                        Previous
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
                                        Next
                                    </Button>
                                </div>
                            )}
                        </div>

                         <div className="p-6 md:p-8 rounded-xl border bg-muted/30">
                            <h2 className="font-bold text-lg mb-4">Payout Methods</h2>
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">To get paid as a host, you need to set up a payout method.</p>
                                <div>
                                    <Label htmlFor="accHolderName" className="text-xs">Account Holder Name</Label>
                                    <Input id="accHolderName" placeholder="e.g. John Doe" />
                                </div>
                                <div>
                                    <Label htmlFor="bankName" className="text-xs">Bank Name</Label>
                                    <Input id="bankName" placeholder="e.g. State Bank of India" />
                                </div>
                                <div>
                                    <Label htmlFor="accNumber" className="text-xs">Account Number</Label>
                                    <Input id="accNumber" placeholder="e.g. 1234567890" />
                                </div>
                                <div>
                                    <Label htmlFor="ifscCode" className="text-xs">IFSC Code</Label>
                                    <Input id="ifscCode" placeholder="e.g. SBIN0001234" />
                                </div>
                                <Button className="w-full">Save Payout Method</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        let title = '';
        if (activeSetting === 'notifications') title = 'Notifications';
        else if (activeSetting === 'taxes') title = 'Taxes';
        else if (activeSetting === 'privacy') title = 'Privacy & Sharing';

        return (
            <div>
                <h1 className="text-xl md:text-2xl font-bold mb-6">{title}</h1>
                <div className="p-6 md:p-8 rounded-xl border text-center">
                    <p className="text-muted-foreground">This section is a work in progress.</p>
                </div>
            </div>
        );
    }

    switch (activeTab) {
      case 'about':
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-6">About me</h1>
            <div className="p-6 md:p-8 rounded-xl border">
              <h2 className="text-lg font-bold mb-2">Complete your profile</h2>
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
          </div>
        );
      case 'history':
        return (
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-6">Past trips</h1>
            <div className="space-y-6">
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
                <Button variant="default">Add friends</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockConnections.map((connection) => (
                    <Link href={`/profile/${connection.id}`} key={connection.id} className="block border rounded-lg p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                        <Avatar>
                            <AvatarImage src={connection.avatar} alt={connection.name} />
                            <AvatarFallback>{connection.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-sm">{connection.name}</span>
                    </Link>
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

    
    

    

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Shield, Bell, Lock, ChevronRight, CreditCard, FileText } from 'lucide-react';
import type { User as FirebaseUser } from 'firebase/auth';

interface AccountSettingsProps {
  user: FirebaseUser | null;
}

const settingsSections = [
    { 
        icon: <User className="h-6 w-6" />,
        title: "Personal info",
        description: "Update your personal details.",
        link: "/work-in-progress"
    },
    { 
        icon: <Lock className="h-6 w-6" />,
        title: "Login & security",
        description: "Manage your password and security settings.",
        link: "/work-in-progress"
    },
    { 
        icon: <CreditCard className="h-6 w-6" />,
        title: "Payments & payouts",
        description: "Review payments and payouts.",
        link: "/work-in-progress"
    },
    { 
        icon: <Bell className="h-6 w-6" />,
        title: "Notifications",
        description: "Choose your notification preferences.",
        link: "/work-in-progress"
    },
    { 
        icon: <FileText className="h-6 w-6" />,
        title: "Taxes",
        description: "Manage your tax information.",
        link: "/work-in-progress"
    },
    { 
        icon: <Shield className="h-6 w-6" />,
        title: "Privacy & sharing",
        description: "Control your privacy settings.",
        link: "/work-in-progress"
    },
];

export function AccountSettings({ user }: AccountSettingsProps) {
  if (!user) return null;

  return (
    <div>
        <h1 className="text-xl md:text-2xl font-bold mb-6">Account Settings</h1>
        <div className="space-y-4">
            {settingsSections.map((section, index) => (
                <Link href={section.link} key={index} className="block border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-center">
                        <div className="flex items-start gap-4">
                            {section.icon}
                            <div>
                                <h3 className="font-semibold">{section.title}</h3>
                                <p className="text-sm text-muted-foreground">{section.description}</p>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                </Link>
            ))}
        </div>
    </div>
  );
}

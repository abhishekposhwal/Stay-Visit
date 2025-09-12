'use client';

import { Button } from '@/components/ui/button';
import { User, Shield, Bell, Lock, ChevronRight, CreditCard, FileText } from 'lucide-react';
import type { User as FirebaseUser } from 'firebase/auth';

interface AccountSettingsProps {
  user: FirebaseUser | null;
  onSettingClick: (setting: string) => void;
}

const settingsSections = [
    { 
        icon: <User className="h-6 w-6" />,
        title: "Personal info",
        description: "Update your personal details.",
        id: "personal-info"
    },
    { 
        icon: <Lock className="h-6 w-6" />,
        title: "Login & security",
        description: "Manage your password and security settings.",
        id: "login-security"
    },
    { 
        icon: <CreditCard className="h-6 w-6" />,
        title: "Payments & payouts",
        description: "Review payments and payouts.",
        id: "payments"
    },
    { 
        icon: <Bell className="h-6 w-6" />,
        title: "Notifications",
        description: "Choose your notification preferences.",
        id: "notifications"
    },
    { 
        icon: <Shield className="h-6 w-6" />,
        title: "Privacy & sharing",
        description: "Control your privacy settings.",
        id: "privacy"
    },
];

export function AccountSettings({ user, onSettingClick }: AccountSettingsProps) {
  if (!user) return null;

  return (
    <div>
        <h1 className="text-xl md:text-2xl font-bold mb-6">Account Settings</h1>
        <div className="space-y-4">
            {settingsSections.map((section) => (
                <button 
                  key={section.id} 
                  className="w-full text-left border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  onClick={() => onSettingClick(section.id)}
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-start gap-4">
                            {section.icon}
                            <div>
                                <h3 className="font-semibold text-sm">{section.title}</h3>
                                <p className="text-xs text-muted-foreground">{section.description}</p>
                            </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                </button>
            ))}
        </div>
    </div>
  );
}

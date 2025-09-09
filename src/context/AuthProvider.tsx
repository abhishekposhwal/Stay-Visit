
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, type UserCredential } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<UserCredential>;
  signUp: (email: string, pass: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  signOut: () => Promise<void>;
  updateUserProfile: (profile: { displayName?: string; photoURL?: string; }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const signUp = async (email: string, pass: string) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updateUserProfile = async (profile: { displayName?: string; photoURL?: string; }) => {
    if (!auth.currentUser) {
        throw new Error("No user is signed in to update the profile.");
    }
    await updateProfile(auth.currentUser, profile);
    // Manually update the user state to reflect the change immediately
    setUser(auth.currentUser);
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

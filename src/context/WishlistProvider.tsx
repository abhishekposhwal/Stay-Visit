
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast"

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem('stayvisit-wishlist');
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Could not read wishlist from localStorage", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('stayvisit-wishlist', JSON.stringify(wishlist));
    } catch (error) {
       console.error("Could not save wishlist to localStorage", error);
    }
  }, [wishlist]);

  const addToWishlist = (id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
    toast({
      title: "Added to Wishlist",
      description: "You can view your wishlist from the user menu.",
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((itemId) => itemId !== id));
    toast({
        title: "Removed from Wishlist",
    });
  };

  const isInWishlist = (id: string) => {
    return wishlist.includes(id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

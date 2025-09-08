"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Property } from '@/lib/types';

interface WishlistContextType {
  wishlist: Property[];
  addToWishlist: (item: Property) => void;
  removeFromWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Property[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem('stayvisit-wishlist');
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage", error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('stayvisit-wishlist', JSON.stringify(wishlist));
      } catch (error) {
        console.error("Failed to save wishlist to localStorage", error);
      }
    }
  }, [wishlist, isLoaded]);

  const addToWishlist = useCallback((item: Property) => {
    setWishlist((prev) => [...prev, item]);
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const isWishlisted = useCallback((id: string) => {
    return wishlist.some((item) => item.id === id);
  }, [wishlist]);

  const value = { wishlist, addToWishlist, removeFromWishlist, isWishlisted };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

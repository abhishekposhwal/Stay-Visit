"use client";

import { useState } from 'react';
import { Star, Sparkles, Loader2 } from 'lucide-react';

import { useWishlist } from '@/context/WishlistContext';
import { properties } from '@/lib/data';
import type { Property } from '@/lib/types';
import { recommendSimilarListings, RecommendSimilarListingsOutput } from '@/ai/flows/ai-recommend-similar-listings';
import { Button } from '@/components/ui/button';
import { ListingGrid } from '@/components/listings/ListingGrid';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

async function getRecommendationsAction(
  wishlistSummaries: string[]
): Promise<RecommendSimilarListingsOutput | { error: string }> {
  "use server";
  try {
    const allListingSummaries = properties.map(p => p.summary);
    const recommendations = await recommendSimilarListings({
      wishlistSummaries,
      allListingSummaries,
    });
    return recommendations;
  } catch (error) {
    console.error(error);
    return { error: "Failed to get recommendations." };
  }
}

export default function RecommendationsPage() {
  const { wishlist } = useWishlist();
  const [recommendations, setRecommendations] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    if (wishlist.length === 0) {
      setError("Your wishlist is empty. Add some items to get recommendations.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations([]);
    
    const wishlistSummaries = wishlist.map((item) => item.summary);
    const result = await getRecommendationsAction(wishlistSummaries);

    if ("error" in result) {
      setError(result.error);
    } else {
      const recommendedProps = properties.filter((p) =>
        result.recommendedListingSummaries.includes(p.summary)
      );
      setRecommendations(recommendedProps);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Sparkles className="mx-auto h-12 w-12 text-accent" />
          <h1 className="text-3xl md:text-4xl font-bold font-headline mt-4">AI-Powered Recommendations</h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover new places you'll love, based on your wishlist.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto text-center shadow-md">
            <CardHeader>
                <CardTitle>Ready for your personalized travel suggestions?</CardTitle>
                <CardDescription>
                    Our AI will analyze your wishlist (currently with {wishlist.length} items) to find your next perfect getaway.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleGetRecommendations} disabled={isLoading || wishlist.length === 0} size="lg">
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                        </>
                    ) : (
                        <>
                        <Star className="mr-2 h-4 w-4" />
                        Get Recommendations
                        </>
                    )}
                </Button>
                {wishlist.length === 0 && (
                    <p className="text-sm text-destructive mt-2">Add items to your wishlist to enable this feature.</p>
                )}
            </CardContent>
        </Card>

        <div className="mt-12">
          {error && <p className="text-center text-destructive">{error}</p>}
          {recommendations.length > 0 && (
            <>
              <h2 className="text-2xl font-bold font-headline mb-6 text-center">Here's what we found for you:</h2>
              <ListingGrid properties={recommendations} />
            </>
          )}
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}

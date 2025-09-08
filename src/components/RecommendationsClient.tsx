
'use client';

import { useState, useEffect } from 'react';
import { recommendSimilarListings } from '@/ai/flows/ai-recommend-similar-listings';
import type { Property } from '@/lib/types';
import { useWishlist } from '@/context/WishlistProvider';
import ListingsGrid from './listings/ListingsGrid';
import { Button } from './ui/button';
import { Sparkles, Heart } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface RecommendationsClientProps {
  allProperties: Property[];
}

export default function RecommendationsClient({ allProperties }: RecommendationsClientProps) {
  const { wishlist } = useWishlist();
  const [recommendations, setRecommendations] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async () => {
    setLoading(true);
    setError(null);
    setRecommendations([]);

    if (wishlist.length === 0) {
      setError('Add some properties to your wishlist to get personalized recommendations.');
      setLoading(false);
      return;
    }

    try {
      const savedListingSummaries = wishlist
        .map(id => allProperties.find(p => p.id === id)?.summary)
        .filter((summary): summary is string => !!summary);

      const unstarredListingSummariesMap = new Map<string, string>();
      allProperties.forEach(p => {
        if (!wishlist.includes(p.id)) {
            unstarredListingSummariesMap.set(p.summary, p.id);
        }
      });
      
      const unstarredListingSummaries = Array.from(unstarredListingSummariesMap.keys());

      const recommendedSummaries = await recommendSimilarListings({
        savedListingSummaries,
        unstarredListingSummaries,
        numberOfRecommendations: 3,
      });

      const recommendedProperties = recommendedSummaries
        .map(summary => {
            const recommendedId = unstarredListingSummariesMap.get(summary);
            return allProperties.find(p => p.id === recommendedId);
        })
        .filter((p): p is Property => !!p);
      
      setRecommendations(recommendedProperties);
    } catch (e) {
      console.error(e);
      setError('Could not fetch recommendations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Automatically fetch recommendations on initial load if wishlist is not empty
    if (wishlist.length > 0) {
      getRecommendations();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Stays Picked For You
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Based on your wishlist, we think you'll love these. Discover your next favorite getaway.
        </p>
        <Button onClick={getRecommendations} disabled={loading || wishlist.length === 0} className="mt-6">
          <Sparkles className="mr-2 h-4 w-4" />
          {loading ? 'Analyzing...' : 'Refresh Recommendations'}
        </Button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-4">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                </div>
            ))}
        </div>
      )}

      {error && <p className="text-center text-destructive">{error}</p>}
      
      {!loading && !error && recommendations.length > 0 && (
        <ListingsGrid listings={recommendations} />
      )}

      {!loading && !error && recommendations.length === 0 && wishlist.length > 0 && (
        <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-2">No recommendations to show right now.</h2>
            <p className="text-muted-foreground">Try refreshing, or add more items to your wishlist for better results.</p>
        </div>
      )}

       {!loading && wishlist.length === 0 && (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-6 text-2xl font-bold">Start your Wishlist</h2>
            <p className="mt-2 text-muted-foreground">As you browse, tap the heart on any stay to save it here.</p>
            <Button asChild className="mt-4">
                <a href="/listings">Explore Stays</a>
            </Button>
        </div>
      )}
    </div>
  );
}

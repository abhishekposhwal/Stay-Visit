'use server';
/**
 * @fileOverview An AI agent that recommends similar listings based on a user's wishlist.
 *
 * - recommendSimilarListings - A function that takes a list of listing summaries and recommends similar listings.
 * - RecommendSimilarListingsInput - The input type for the recommendSimilarListings function.
 * - RecommendSimilarListingsOutput - The return type for the recommendSimilarListings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSimilarListingsInputSchema = z.object({
  wishlistSummaries: z
    .array(z.string())
    .describe('A list of summaries of the listings in the user\'s wishlist.'),
  allListingSummaries: z
    .array(z.string())
    .describe('A list of summaries of all available listings.'),
});
export type RecommendSimilarListingsInput = z.infer<
  typeof RecommendSimilarListingsInputSchema
>;

const RecommendSimilarListingsOutputSchema = z.object({
  recommendedListingSummaries: z
    .array(z.string())
    .describe('A list of summaries of recommended listings.'),
});
export type RecommendSimilarListingsOutput = z.infer<
  typeof RecommendSimilarListingsOutputSchema
>;

export async function recommendSimilarListings(
  input: RecommendSimilarListingsInput
): Promise<RecommendSimilarListingsOutput> {
  return recommendSimilarListingsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendSimilarListingsPrompt',
  input: {schema: RecommendSimilarListingsInputSchema},
  output: {schema: RecommendSimilarListingsOutputSchema},
  prompt: `You are a travel expert. A user has a wishlist of the following listings:

{{#each wishlistSummaries}}
- {{{this}}}
{{/each}}

Based on these listings, recommend other listings from the following list that the user might like:

{{#each allListingSummaries}}
- {{{this}}}
{{/each}}

Only return the summaries of the recommended listings.

Make sure the recommended listings are similar to the listings in the user's wishlist.
`,
});

const recommendSimilarListingsFlow = ai.defineFlow(
  {
    name: 'recommendSimilarListingsFlow',
    inputSchema: RecommendSimilarListingsInputSchema,
    outputSchema: RecommendSimilarListingsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

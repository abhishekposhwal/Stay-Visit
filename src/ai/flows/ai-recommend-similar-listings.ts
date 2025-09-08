'use server';

/**
 * @fileOverview A Genkit flow for recommending similar listings based on AI summaries of user's saved listings.
 *
 * - recommendSimilarListings - A function that handles the recommendation process.
 * - RecommendSimilarListingsInput - The input type for the recommendSimilarListings function.
 * - RecommendSimilarListingsOutput - The return type for the recommendSimilarListings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendSimilarListingsInputSchema = z.object({
  savedListingSummaries: z
    .array(z.string())
    .describe('AI summaries of the user\'s saved listings.'),
  unstarredListingSummaries: z
    .array(z.string())
    .describe('AI summaries of listings the user has not yet starred.'),
  numberOfRecommendations: z
    .number()
    .default(3)
    .describe('The number of listing recommendations to return.'),
});
export type RecommendSimilarListingsInput = z.infer<
  typeof RecommendSimilarListingsInputSchema
>;

const RecommendSimilarListingsOutputSchema = z.array(z.string()).describe(
  'A list of recommended listing summaries, ordered by similarity to the user\'s saved listings.'
);
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
  prompt: `You are an AI assistant designed to recommend property listings to users based on their saved listings.

You will receive a list of AI summaries of the user's saved listings, and a list of AI summaries of listings the user has not yet starred.

Compare the unstarred listings to the saved listings and return a list of the most similar unstarred listings, ordered by similarity.

You should only return listing summaries from the unstarred listings.

Saved Listing Summaries:
{{#each savedListingSummaries}}
- {{{this}}}
{{/each}}

Unstarred Listing Summaries:
{{#each unstarredListingSummaries}}
- {{{this}}}
{{/each}}

Number of Recommendations: {{{numberOfRecommendations}}}

Recommended Listings:`,
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

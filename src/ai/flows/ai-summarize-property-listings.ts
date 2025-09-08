'use server';
/**
 * @fileOverview A property listing summarization AI agent.
 *
 * - summarizePropertyListings - A function that handles the summarization process.
 * - SummarizePropertyListingsInput - The input type for the summarizePropertyListings function.
 * - SummarizePropertyListingsOutput - The return type for the summarizePropertyListings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePropertyListingsInputSchema = z.object({
  propertyDetails: z
    .string()
    .describe('Detailed information about the property listing.'),
});
export type SummarizePropertyListingsInput = z.infer<typeof SummarizePropertyListingsInputSchema>;

const SummarizePropertyListingsOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the property listing.'),
});
export type SummarizePropertyListingsOutput = z.infer<typeof SummarizePropertyListingsOutputSchema>;

export async function summarizePropertyListings(input: SummarizePropertyListingsInput): Promise<SummarizePropertyListingsOutput> {
  return summarizePropertyListingsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePropertyListingsPrompt',
  input: {schema: SummarizePropertyListingsInputSchema},
  output: {schema: SummarizePropertyListingsOutputSchema},
  prompt: `You are an AI expert in creating concise summaries of property listings.

  Given the following property details, generate a summary highlighting the key features,
nearby attractions, and unique selling points. The summary should be easy to understand at a glance.

  Property Details: {{{propertyDetails}}}`,
});

const summarizePropertyListingsFlow = ai.defineFlow(
  {
    name: 'summarizePropertyListingsFlow',
    inputSchema: SummarizePropertyListingsInputSchema,
    outputSchema: SummarizePropertyListingsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

'use server';
/**
 * @fileOverview A property listing summarization AI agent.
 *
 * - summarizePropertyListings - A function that handles the property listing summarization process.
 * - SummarizePropertyListingsInput - The input type for the summarizePropertyListings function.
 * - SummarizePropertyListingsOutput - The return type for the summarizePropertyListings function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePropertyListingsInputSchema = z.object({
  details: z.string().describe('The detailed description of the property.'),
});
export type SummarizePropertyListingsInput = z.infer<typeof SummarizePropertyListingsInputSchema>;

const SummarizePropertyListingsOutputSchema = z.object({
  summary: z.string().describe('A concise and engaging summary of the property.'),
});
export type SummarizePropertyListingsOutput = z.infer<typeof SummarizePropertyListingsOutputSchema>;

export async function summarizePropertyListings(
  input: SummarizePropertyListingsInput
): Promise<SummarizePropertyListingsOutput> {
  return summarizePropertyListingsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePropertyListingsPrompt',
  input: {schema: SummarizePropertyListingsInputSchema},
  output: {schema: SummarizePropertyListingsOutputSchema},
  prompt: `You are an expert real estate copywriter.

  You will be provided with a detailed description of a property.
  Your task is to create a concise and engaging summary that highlights the key features and benefits of the property for potential renters or buyers. The summary should be no more than 50 words.

  Property Details: {{{details}}}`,
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

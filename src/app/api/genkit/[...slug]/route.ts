import {createApp, GenkitError} from '@genkit-ai/next';

const app = createApp({
  auth: async (auth, req) => {
    // You may want to implement your own authentication logic here.
    // For more information, see https://firebase.google.com/docs/auth.
    if (!auth && process.env.NODE_ENV === 'production') {
      throw new GenkitError({
        status: 401,
        message: 'You must be logged in to use this feature.',
      });
    }
  },
});

export const GET = app.GET;
export const POST = app.POST;

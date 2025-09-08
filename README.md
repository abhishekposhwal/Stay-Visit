# StayVisit - AI-Powered Travel Platform

Welcome to StayVisit, a modern web application built with Next.js that demonstrates how to build a feature-rich travel and booking platform, complete with AI-powered recommendations.

This project is designed to be a starting point for developers looking to build sophisticated web applications with a modern tech stack.

## Features

- **Dynamic Listings:** Browse properties, experiences, and services.
- **AI-Powered Recommendations:** Get personalized stay suggestions based on your wishlist.
- **Search & Filtering:** Find listings by city.
- **Wishlist:** Save your favorite properties.
- **Responsive Design:** A seamless experience on desktop and mobile devices.

## Tech Stack

This project is built with a modern, performant, and scalable tech stack:

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
- **AI Integration:** [Genkit](https://firebase.google.com/docs/genkit)
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/stayvisit.git
    cd stayvisit
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Google AI API key. You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Server-Side Details

This application heavily utilizes the server-side capabilities of Next.js and Genkit.

- **Next.js App Router:** Most components are React Server Components by default. This reduces the amount of JavaScript sent to the client, improving performance. Pages and layouts are rendered on the server.
- **Genkit Flows:** All AI-related functionality is handled by Genkit flows located in the `src/ai/flows` directory. These are server-side TypeScript functions that interact with the Google AI models. They are decorated with `'use server';` to ensure they only run on the server, even when called from client components.
- **API Keys:** The `GEMINI_API_KEY` is a server-side secret and should not be exposed to the client. The `.env` file is used to load this key into the server environment.

## File Structure

The project follows a standard Next.js App Router structure:

```
.
├── src
│   ├── app/                  # Main application routes (App Router)
│   │   ├── (pages)/          # Route groups for different sections
│   │   │   ├── [id]/page.tsx # Dynamic route for individual listings
│   │   │   └── page.tsx      # Main page for a section
│   │   ├── globals.css       # Global styles and Tailwind directives
│   │   ├── layout.tsx        # Root layout for the application
│   │   └── page.tsx          # Homepage
│   │
│   ├── ai/                   # Genkit AI functionality
│   │   ├── flows/            # Genkit flows for specific AI tasks
│   │   └── genkit.ts         # Genkit configuration
│   │
│   ├── components/           # Reusable React components
│   │   ├── layout/           # Components for overall page structure (Navbar, Footer)
│   │   ├── listings/         # Components related to property listings
│   │   └── ui/               # ShadCN UI components
│   │
│   ├── context/              # React context providers (e.g., Wishlist)
│   │
│   ├── hooks/                # Custom React hooks
│   │
│   ├── lib/                  # Libraries, helpers, and static data
│   │   ├── data.ts           # Static data for property listings
│   │   ├── types.ts          # TypeScript type definitions
│   │   └── utils.ts          # Utility functions
│
├── public/                   # Static assets (images, fonts, etc.)
│
├── next.config.ts            # Next.js configuration
├── package.json              # Project dependencies and scripts
└── tailwind.config.ts        # Tailwind CSS configuration
```

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React Documentation](https://react.dev/) - learn about React.
- [Genkit Documentation](https://firebase.google.com/docs/genkit) - learn about building with Genkit.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS.
- [ShadCN UI Documentation](https://ui.shadcn.com/docs) - learn about ShadCN UI components.

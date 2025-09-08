
import type { Property } from '@/lib/types';

const originalsData: Omit<Property, 'id' | 'reviews' | 'guests' | 'bedrooms' | 'beds' | 'baths' | 'amenities' | 'host' | 'details' | 'summary' | 'coords' | 'category'>[] = [
    {
        images: ["https://picsum.photos/seed/exp1/600/400"],
        title: "Lunch with fashion icon Lenny Niemeyer in her home",
        type: "Experience",
        location: "Rio de Janeiro, Brazil",
        price: 9305,
        rating: 5.0,
    },
    {
        images: ["https://picsum.photos/seed/exp2/600/400"],
        title: "Create seasonal ikebana with Watarai Toru",
        type: "Experience",
        location: "Kamakura, Japan",
        price: 8623,
        rating: 5.0
    },
    {
        images: ["https://picsum.photos/seed/exp3/600/400"],
        title: "Hit the ice with Paralympian Andrea Macrì",
        type: "Experience",
        location: "Turin, Italy",
        price: 2689,
        rating: 5.0
    },
    {
        images: ["https://picsum.photos/seed/exp4/600/400"],
        title: "Fence and take photos with Olympian Enzo Lefort",
        type: "Experience",
        location: "Paris, France",
        price: 13133,
        rating: 5.0
    }
];

const popularData: Omit<Property, 'id' | 'reviews' | 'guests' | 'bedrooms' | 'beds' | 'baths' | 'amenities' | 'host' | 'details' | 'summary' | 'coords' | 'category'>[] = [
    {
        images: ["https://picsum.photos/seed/exp5/600/400"],
        title: "Uncover Fontainhas' heritage",
        type: "Experience",
        location: "Goa, India",
        price: 1100,
        rating: 4.9
    },
    {
        images: ["https://picsum.photos/seed/exp6/600/400"],
        title: "Discover coastal paradise in Goa",
        type: "Experience",
        location: "Goa, India",
        price: 1500,
        rating: 4.94
    },
    {
        images: ["https://picsum.photos/seed/exp7/600/400"],
        title: "Trek to a hidden waterfall in Goa's forest",
        type: "Experience",
        location: "Goa, India",
        price: 2400,
        rating: 4.88
    },
    {
        images: ["https://picsum.photos/seed/exp8/600/400"],
        title: "Embark on a heritage walk around Old Goa",
        type: "Experience",
        location: "Goa, India",
        price: 1650,
        rating: 4.92
    }
];

export const experiences: Property[] = [
    ...originalsData.map((experience, index) => ({
        ...experience,
        id: `exp-${index}`,
        category: 'Originals' as const,
        guests: 1,
        bedrooms: 1,
        beds: 1,
        baths: 1,
        amenities: ['Wifi', 'Air conditioning', 'Kitchen'],
        host: { name: 'Pro Host', avatar: 'https://picsum.photos/100/100', isSuperhost: true },
        details: `This is a placeholder detail for ${experience.title}. A real experience would have a rich description of what to expect, the host's background, and what makes this experience unique.`,
        summary: `A brief summary for ${experience.title}.`,
        coords: { lat: 0, lng: 0 },
        reviews: Math.floor(Math.random() * 200) + 50
    })),
    ...popularData.map((experience, index) => ({
        ...experience,
        id: `exp-${index + originalsData.length}`,
        category: 'Popular' as const,
        guests: 1,
        bedrooms: 1,
        beds: 1,
        baths: 1,
        amenities: ['Wifi', 'Air conditioning', 'Kitchen'],
        host: { name: 'Pro Host', avatar: 'https://picsum.photos/100/100', isSuperhost: true },
        details: `This is a placeholder detail for ${experience.title}. A real experience would have a rich description of what to expect, the host's background, and what makes this experience unique.`,
        summary: `A brief summary for ${experience.title}.`,
        coords: { lat: 0, lng: 0 },
        reviews: Math.floor(Math.random() * 200) + 50
    }))
];

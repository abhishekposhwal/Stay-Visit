export interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  coords: {
    lat: number;
    lng: number;
  };
  price: number;
  rating: number;
  reviews: number;
  reviewDetails?: {
    id: string;
    author: string;
    authorAvatar: string;
    date: string;
    text: string;
  }[];
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: string[];
  host: {
    name: string;
    avatar: string;
    isSuperhost: boolean;
  };
  images: string[];
  details: string;
  summary: string;
  category?: string;
}

export interface User {
  name: string;
  avatar: string;
}

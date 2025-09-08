export type PropertyType = 'Stay' | 'Experience' | 'Service';

export type Property = {
  id: string;
  title: string;
  type: PropertyType;
  category?: string;
  location: string;
  city: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  details: string;
  summary: string;
  amenities: string[];
  host: {
    name: string;
    avatar: string;
    joinYear: number;
  };
};

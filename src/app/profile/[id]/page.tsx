
import { notFound } from 'next/navigation';
import { UserProfile } from '@/components/profile/UserProfile';

const mockUsers = [
    { id: '1', name: 'Priya', avatar: 'https://picsum.photos/seed/p1/200/200', bio: 'Travel enthusiast and foodie. Always looking for the next adventure.', location: 'Mumbai, India', since: '2021', reviews: 12 },
    { id: '2', name: 'Amit', avatar: 'https://picsum.photos/seed/p2/200/200', bio: 'Software engineer by day, photographer by night. Loves exploring cities.', location: 'Delhi, India', since: '2020', reviews: 8 },
    { id: '3', name: 'Sunita', avatar: 'https://picsum.photos/seed/p3/200/200', bio: 'Loves hosting and meeting new people from around the world.', location: 'Jaipur, India', since: '2019', reviews: 25 },
    { id: '4', name: 'Vikram', avatar: 'https://picsum.photos/seed/p4/200/200', bio: 'Family man who enjoys beach vacations and historical sites.', location: 'Bengaluru, India', since: '2022', reviews: 5 },
    { id: '5', name: 'Neha', avatar: 'https://picsum.photos/seed/p5/200/200', bio: 'Yoga instructor and wellness advocate. Enjoys peaceful retreats.', location: 'Pune, India', since: '2021', reviews: 15 },
    { id: '6', name: 'Karan', avatar: 'https://picsum.photos/seed/p6/200/200', bio: 'Professional chef who loves to travel for culinary inspiration.', location: 'Goa, India', since: '2018', reviews: 30 },
];

interface UserProfilePageProps {
  params: {
    id: string;
  };
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  const user = mockUsers.find(u => u.id === params.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <UserProfile user={user} />
    </div>
  );
}

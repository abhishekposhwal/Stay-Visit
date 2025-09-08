
import { notFound } from 'next/navigation';
import { properties } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, Calendar, MapPin, Users, IndianRupee } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const bookingHistory = [
  {
    id: '1',
    title: 'Sea-facing Apartment in Bandra',
    location: 'Mumbai, India',
    dates: 'Aug 15, 2024 - Aug 20, 2024',
    price: '₹40,000',
    guests: '4',
    image: 'https://picsum.photos/seed/1/800/600'
  },
  {
    id: '6',
    title: 'Royal Haveli Suite in Jaipur',
    location: 'Jaipur, India',
    dates: 'Jul 5, 2024 - Jul 10, 2024',
    price: '₹45,000',
    guests: '2',
    image: 'https://picsum.photos/seed/31/800/600'
  },
  {
    id: '17',
    title: 'Tea Estate Bungalow',
    location: 'Munnar, India',
    dates: 'May 1, 2024 - May 8, 2024',
    price: '₹70,000',
    guests: '6',
    image: 'https://picsum.photos/seed/97/800/600'
  }
];

export default function BookingDetailsPage({ params }: { params: { id: string } }) {
  const booking = bookingHistory.find(b => b.id === params.id);
  const property = properties.find(p => p.id === params.id);

  if (!booking || !property) {
    notFound();
  }

  const isPastBooking = new Date(booking.dates.split(' - ')[1]) < new Date();

  return (
    <div className="container mx-auto py-24 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
           <Card>
            <CardHeader>
                <CardTitle className="text-3xl font-bold">{booking.title}</CardTitle>
                <CardDescription className="flex items-center gap-2 text-md text-muted-foreground">
                    <MapPin className="w-4 h-4"/> {booking.location}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
                    <Image src={booking.image} alt={booking.title} layout="fill" objectFit="cover" data-ai-hint="property exterior" />
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-accent" />
                        <div>
                            <h3 className="font-semibold text-base">Dates</h3>
                            <p className="text-sm text-muted-foreground">{booking.dates}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-accent" />
                        <div>
                            <h3 className="font-semibold text-base">Guests</h3>
                            <p className="text-sm text-muted-foreground">{booking.guests}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <IndianRupee className="w-5 h-5 text-accent" />
                        <div>
                            <h3 className="font-semibold text-base">Total Price</h3>
                            <p className="text-sm text-muted-foreground">{booking.price}</p>
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />
                
                {isPastBooking ? (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
                        <form>
                            <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="rating">Rating</Label>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Button key={star} variant="ghost" size="icon" className="text-yellow-400 hover:text-yellow-500">
                                            <Star className="w-6 h-6" />
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="review">Your Review</Label>
                                <Textarea id="review" placeholder="Tell us about your stay..." rows={5} />
                            </div>
                            <Button type="submit">Submit Review</Button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Upcoming Booking</h2>
                        <p className="text-muted-foreground">You can't review this property until after your stay. We hope you have a wonderful time!</p>
                    </div>
                )}
            </CardContent>
           </Card>
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
                <CardTitle>Host Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Image src={property.host.avatar} alt={property.host.name} width={64} height={64} className="rounded-full" />
                <div>
                  <h3 className="font-semibold text-lg">{property.host.name}</h3>
                  {property.host.isSuperhost && <p className="text-sm text-accent font-medium">Superhost</p>}
                </div>
              </div>
              <Button className="w-full">Contact Host</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

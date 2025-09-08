import Image from 'next/image';
import { SearchBar } from '@/components/shared/SearchBar';
import { FeaturedCitySection } from '@/components/listings/FeaturedCitySection';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';

export default function Home() {
  const featuredCities = ['Mumbai', 'Delhi', 'Goa', 'Bengaluru'];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="relative h-[50vh] min-h-[400px] max-h-[600px] w-full">
          <Image
            src="https://picsum.photos/1600/800"
            alt="Scenic view of a travel destination"
            data-ai-hint="travel destination"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 tracking-tight leading-tight">
              Discover Your Next Adventure
            </h1>
            <p className="max-w-xl md:text-xl mb-8">
              Book unique stays, unforgettable experiences, and helpful services—all in one place.
            </p>
            <div className="w-full max-w-2xl">
              <SearchBar />
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="space-y-12">
            {featuredCities.map((city) => (
              <FeaturedCitySection key={city} city={city} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}

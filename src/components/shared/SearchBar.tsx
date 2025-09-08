"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar({ onSearch }: { onSearch?: () => void }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/listings?city=${encodeURIComponent(query.trim())}`);
      if (onSearch) {
        onSearch();
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full items-center space-x-2 rounded-full bg-white p-1 shadow-lg border">
      <div className="pl-3">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Search by city (e.g., Goa)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-base p-2"
      />
      <Button type="submit" className="rounded-full bg-accent hover:bg-accent/90 px-6">
        Search
      </Button>
    </form>
  );
}

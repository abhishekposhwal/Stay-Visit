
'use client';

import { SearchBar } from './SearchBar';

export default function PageWithSearchBarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="sticky top-16 z-40 bg-background border-b shadow-sm md:block hidden">
                <SearchBar />
            </div>
            <div className="pt-8">
                {children}
            </div>
        </div>
    );
}

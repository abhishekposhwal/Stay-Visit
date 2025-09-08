
'use client';

import { SearchBar } from './SearchBar';

export default function PageWithSearchBarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="hidden md:block sticky top-16 z-30 pb-4 bg-background border-b">
                 <div className="-mt-16">
                    <SearchBar />
                </div>
            </div>
            <div className="pt-8">
                {children}
            </div>
        </div>
    );
}

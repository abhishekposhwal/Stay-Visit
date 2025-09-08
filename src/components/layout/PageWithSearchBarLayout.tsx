
'use client';

import { SearchBar } from './SearchBar';

export default function PageWithSearchBarLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="pt-24 md:pt-8">
                {children}
            </div>
        </div>
    );
}

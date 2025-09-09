
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground mt-16">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-foreground">Help Center</Link></li>
              <li><Link href="#" className="hover:text-foreground">Safety information</Link></li>
              <li><Link href="#" className="hover:text-foreground">Cancellation options</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-foreground">Diversity & Belonging</Link></li>
              <li><Link href="#" className="hover:text-foreground">Accessibility</Link></li>
              <li><Link href="#" className="hover:text-foreground">Guest Referrals</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">Hosting</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-foreground">Try hosting</Link></li>
              <li><Link href="#" className="hover:text-foreground">Explore hosting resources</Link></li>
              <li><Link href="#" className="hover:text-foreground">Visit our community forum</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-foreground">Newsroom</Link></li>
              <li><Link href="#" className="hover:text-foreground">Learn about new features</Link></li>
              <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} StayVisit, Inc. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Home } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t py-8 text-sm text-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-primary/10">
              <Home className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium text-foreground">Makelaar Match</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link href="/intake" className="hover:text-primary transition-colors">
              Start assessment
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              How it works
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>
          <p className="text-center md:text-right">
            Helping expats find home in the Netherlands
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Home } from "lucide-react";

const footerLinks = {
  tools: [
    { href: "/calculator/mortgage", label: "Mortgage Calculator" },
    { href: "/calculator/costs", label: "Cost Calculator" },
    { href: "/schools", label: "School Finder" },
    { href: "/properties", label: "Property Search" },
  ],
  forExpats: [
    { href: "/#dutch-buying-primer", label: "Dutch Buying 101" },
    { href: "/#faq", label: "Expat FAQ" },
    { href: "/intake", label: "Find Your Home" },
  ],
  resources: [
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/#testimonials", label: "Success Stories" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                <Home className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold text-foreground">Makelaar Match</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-3">
              The expat-first platform for buying your Dutch home.
            </p>
            <p className="text-xs text-muted-foreground">
              Trusted by expats from 40+ countries
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Free Tools</h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Expats */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">For Expats</h3>
            <ul className="space-y-2">
              {footerLinks.forExpats.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Makelaar Match. All rights reserved.</p>
          <p>Helping expats find home since 2024. Based in Amsterdam 🇳🇱</p>
        </div>
      </div>
    </footer>
  );
}

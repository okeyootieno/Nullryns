import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/training", label: "Training" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer group">
            <svg
              width="32"
              height="32"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
            >
              <path
                d="M50 90C50 90 40 85 45 65C50 45 35 40 30 35C25 30 20 35 20 35C20 35 25 25 35 25C45 25 45 35 50 45C55 35 55 25 65 25C75 25 80 35 80 35C80 35 75 30 70 35C65 40 50 45 55 65C60 85 50 90 50 90Z"
                fill="currentColor"
              />
              <circle cx="50" cy="20" r="8" fill="currentColor" />
              <circle cx="25" cy="45" r="5" fill="currentColor" />
              <circle cx="75" cy="45" r="5" fill="currentColor" />
            </svg>
            <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
              Øryns
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {NavLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary cursor-pointer relative py-1",
                      location === link.href
                        ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4 pl-4 border-l border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Link href="/contact">
              <Button variant="outline">Let's Talk</Button>
            </Link>
            <Link href="/start-a-project">
              <Button className="bg-primary hover:bg-secondary text-primary-foreground">Start a Project</Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <Link href="/start-a-project" className="hidden sm:block">
            <Button size="sm" className="bg-primary hover:bg-secondary text-primary-foreground">Start a Project</Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg p-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {NavLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={cn(
                  "block text-lg font-medium py-2 transition-colors",
                  location === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t border-border flex flex-col gap-3">
            <Link href="/start-a-project">
              <Button className="w-full bg-primary hover:bg-secondary text-primary-foreground">Start a Project</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="w-full">Let's Talk</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

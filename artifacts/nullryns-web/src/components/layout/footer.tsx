import { Link } from "wouter";
import { SiGithub } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t border-primary-foreground/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <svg
                width="32"
                height="32"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-accent"
              >
                <path
                  d="M50 90C50 90 40 85 45 65C50 45 35 40 30 35C25 30 20 35 20 35C20 35 25 25 35 25C45 25 45 35 50 45C55 35 55 25 65 25C75 25 80 35 80 35C80 35 75 30 70 35C65 40 50 45 55 65C60 85 50 90 50 90Z"
                  fill="currentColor"
                />
              </svg>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Øryns
              </span>
            </div>
            <p className="text-primary-foreground/80 font-sans text-sm mb-6 max-w-xs">
              A premium software development collective based in Kenya building technology that improves lives.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="flex flex-col gap-3 text-sm text-primary-foreground/80 font-sans">
              <li><Link href="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="hover:text-accent transition-colors">Projects</Link></li>
              <li><Link href="/team" className="hover:text-accent transition-colors">The Team</Link></li>
              <li><Link href="/training" className="hover:text-accent transition-colors">Mentorship</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-white">Services</h4>
            <ul className="flex flex-col gap-3 text-sm text-primary-foreground/80 font-sans">
              <li><Link href="/services" className="hover:text-accent transition-colors">Web Development</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors">Mobile Apps</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors">Business Systems</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors">UI/UX Design</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-white">Contact Us</h4>
            <ul className="flex flex-col gap-3 text-sm text-primary-foreground/80 font-sans">
              <li>Nullryns@atomicmail.com</li>
              <li className="mt-4">
                <a 
                  href="https://github.com/Nullryns" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <SiGithub className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/60 font-sans">
          <p>Copyright © 2026 Nullryns (Øryns). All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="/" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

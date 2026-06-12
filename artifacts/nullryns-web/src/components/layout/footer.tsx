import { useState } from "react";
import { Link } from "wouter";
import { SiGithub } from "react-icons/si";
import { LegalModal } from "@/components/legal-modal";

export function Footer() {
  const [legalModal, setLegalModal] = useState<"terms" | "privacy" | null>(null);

  return (
    <>
      <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t border-primary-foreground/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/logo.jpg"
                  alt="Øryns logo"
                  className="w-10 h-10 rounded-full object-cover shadow-md border-2 border-primary-foreground/20"
                />
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
              <button
                onClick={() => setLegalModal("privacy")}
                className="hover:text-accent transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setLegalModal("terms")}
                className="hover:text-accent transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>

      <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />
    </>
  );
}

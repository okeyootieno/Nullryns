import { useState, useEffect } from "react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { BackToTop } from "@/components/back-to-top";
import { WhatsAppButton } from "@/components/whatsapp-button";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial loading screen simulation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6 animate-in fade-in duration-500">
          <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary animate-pulse"
          >
            <path
              d="M50 90C50 90 40 85 45 65C50 45 35 40 30 35C25 30 20 35 20 35C20 35 25 25 35 25C45 25 45 35 50 45C55 35 55 25 65 25C75 25 80 35 80 35C80 35 75 30 70 35C65 40 50 45 55 65C60 85 50 90 50 90Z"
              fill="currentColor"
            />
            <circle cx="50" cy="20" r="8" fill="currentColor" />
            <circle cx="25" cy="45" r="5" fill="currentColor" />
            <circle cx="75" cy="45" r="5" fill="currentColor" />
          </svg>
          <div className="h-1 w-32 bg-secondary/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary animate-[pulse_1s_ease-in-out_infinite]" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1 w-full pt-[72px]">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out fill-mode-forwards">
          {children}
        </div>
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </div>
  );
}

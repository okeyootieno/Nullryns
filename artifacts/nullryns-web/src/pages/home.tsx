import { SEO } from "@/components/seo";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { ArrowRight, Code2, Smartphone, LayoutDashboard, ChevronLeft, ChevronRight } from "lucide-react";

function Counter({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-serif text-4xl md:text-5xl font-bold text-primary">
      {count}{suffix}
    </span>
  );
}

// ─── Office Slideshow ────────────────────────────────────────────────────────
// Drop your office/workspace photos into /public/office/ and list them here.
// Supported formats: .jpg, .jpeg, .png, .webp
const officeSlides = [
  { src: "/office/office-1.jpg", caption: "Where ideas take shape" },
  { src: "/office/office-2.jpg", caption: "Built in Nairobi, shipped worldwide" },
  { src: "/office/office-3.jpg", caption: "Precision in every line of code" },
  { src: "/office/office-4.jpg", caption: "Collaboration at the core" },
  { src: "/office/office-5.jpg", caption: "Crafted with purpose" },
];

function OfficeSlideshow() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent((index + officeSlides.length) % officeSlides.length);
  }, []);

  const next = useCallback(() => go(current + 1, 1), [current, go]);
  const prev = useCallback(() => go(current - 1, -1), [current, go]);

  // Auto-advance every 5 s
  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  // Pause on hover
  const pause = () => { if (timerRef.current) clearInterval(timerRef.current); };
  const resume = () => { timerRef.current = setInterval(next, 5000); };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div
      className="relative w-full h-[480px] md:h-[600px] overflow-hidden bg-secondary/10 rounded-none"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          {/* Ken Burns zoom */}
          <motion.img
            src={officeSlides[current].src}
            alt={officeSlides[current].caption}
            className="w-full h-full object-cover"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5.5, ease: "linear" }}
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

          {/* Caption */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center px-6"
          >
            <p className="font-serif text-xl md:text-2xl text-foreground/90 italic">
              "{officeSlides[current].caption}"
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      <button
        onClick={() => { pause(); prev(); resume(); }}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button
        onClick={() => { pause(); next(); resume(); }}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/60 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-background transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {officeSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => { pause(); go(i, i > current ? 1 : -1); resume(); }}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-primary w-6" : "bg-foreground/30 hover:bg-foreground/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <SEO
        title="Software Development Collective"
        description="Nullryns (Øryns) is a premium software development collective in Kenya building websites, apps, and business systems."
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-[120%] h-[120%] max-w-none text-primary animate-[spin_120s_linear_infinite]">
            <path d="M50 90C50 90 40 85 45 65C50 45 35 40 30 35C25 30 20 35 20 35C20 35 25 25 35 25C45 25 45 35 50 45C55 35 55 25 65 25C75 25 80 35 80 35C80 35 75 30 70 35C65 40 50 45 55 65C60 85 50 90 50 90Z" fill="currentColor" />
          </svg>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20 pb-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block px-4 py-2 rounded-full bg-accent/20 text-primary border border-accent/30 font-sans text-sm font-semibold tracking-wide mb-6"
            >
              CRAFTED IN KENYA
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground leading-[1.1] tracking-tight mb-8"
            >
              Technology that <span className="text-primary italic">grows</span> your business.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground font-sans max-w-2xl leading-relaxed mb-10"
            >
              We are a software development collective building premium websites, mobile apps, and systems while mentoring the next generation of builders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact">
                <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-secondary text-primary-foreground border-transparent">
                  Start a Project
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-border hover:bg-accent/10">
                  View Our Work
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="flex flex-col gap-2">
              <Counter end={6} />
              <span className="font-sans text-sm md:text-base text-primary-foreground/80">Expert Team Members</span>
            </div>
            <div className="flex flex-col gap-2">
              <Counter end={20} suffix="+" />
              <span className="font-sans text-sm md:text-base text-primary-foreground/80">Projects Delivered</span>
            </div>
            <div className="flex flex-col gap-2">
              <Counter end={5} suffix="+" />
              <span className="font-sans text-sm md:text-base text-primary-foreground/80">Web & Mobile Solutions</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-serif text-4xl md:text-5xl font-bold text-accent">Active</span>
              <span className="font-sans text-sm md:text-base text-primary-foreground/80">Mentorship Program</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Office Slideshow ── */}
      <section className="bg-background">
        <div className="container mx-auto px-0 md:px-0 max-w-none">
          <OfficeSlideshow />
        </div>
        <div className="container mx-auto px-6 md:px-12 py-8 border-b border-border">
          <p className="text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground text-center">
            Our Space · Nairobi, Kenya
          </p>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Our Expertise</h2>
              <p className="text-lg text-muted-foreground font-sans">
                Precision craftsmanship across the digital spectrum. We deliver solutions that perform under pressure.
              </p>
            </div>
            <Link href="/services">
              <Button variant="outline" className="group">
                All Services <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Web Apps", icon: <Code2 className="w-8 h-8" />, desc: "Robust, scalable web applications built with modern frameworks." },
              { title: "Mobile Dev", icon: <Smartphone className="w-8 h-8" />, desc: "Native-feeling mobile experiences for iOS and Android." },
              { title: "Business Systems", icon: <LayoutDashboard className="w-8 h-8" />, desc: "Custom internal tools and CRMs that streamline your operations." }
            ].map((srv, i) => (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-16 h-16 rounded-xl bg-accent/20 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {srv.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3 text-foreground">{srv.title}</h3>
                <p className="text-muted-foreground font-sans">{srv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-accent/10 border-t border-b border-border">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Ready to root your next idea?</h2>
          <p className="text-lg text-muted-foreground font-sans mb-10">
            Whether you need a full-scale business system or want to join our mentorship program, we're ready to grow together.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full">
              Let's Discuss Your Vision
            </Button>
          </Link>
        </div>
      </section>

      {/* Start Project CTA */}
      <section className="py-32 bg-background border-b border-border overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-full blur-3xl -z-10 translate-x-1/3"></div>
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6">
              Ready to Build Something?
            </h2>
            <p className="text-xl text-muted-foreground font-sans max-w-2xl mx-auto mb-12">
              Submit your project brief and we'll respond within 24 hours with a comprehensive technical and business evaluation.
            </p>
            <Link href="/start-a-project">
              <Button size="lg" className="h-16 px-12 text-xl bg-primary hover:bg-secondary text-primary-foreground group shadow-xl">
                Start a Project <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

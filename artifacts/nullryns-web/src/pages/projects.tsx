import { SEO } from "@/components/seo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const categories = ["All", "Websites", "Web Apps", "Mobile Apps", "Client Systems"];

const portfolio = [
  {
    id: 1,
    title: "E-Commerce Logistics Hub",
    category: "Web Apps",
    desc: "A comprehensive dashboard for managing last-mile delivery drivers and tracking packages in real-time.",
    tech: ["React", "Node.js", "PostgreSQL", "Google Maps API"],
    demoUrl: "#",
    githubUrl: "#",
    color: "bg-blue-900"
  },
  {
    id: 2,
    title: "Soma Academy Platform",
    category: "Websites",
    desc: "Interactive educational platform offering courses, quizzes, and student progress tracking.",
    tech: ["Next.js", "Tailwind", "Supabase"],
    demoUrl: "#",
    githubUrl: "#",
    color: "bg-emerald-900"
  },
  {
    id: 3,
    title: "AfyaHealth Patient App",
    category: "Mobile Apps",
    desc: "React Native application allowing patients to book appointments, view records, and consult doctors via chat.",
    tech: ["React Native", "Firebase", "Express"],
    demoUrl: "#",
    githubUrl: "#",
    color: "bg-teal-900"
  },
  {
    id: 4,
    title: "Retail POS & Inventory",
    category: "Client Systems",
    desc: "Desktop-first web application for retail stores to manage sales, stock levels, and staff shifts.",
    tech: ["React", "Electron", "SQLite"],
    demoUrl: "#",
    githubUrl: "#",
    color: "bg-slate-900"
  },
  {
    id: 5,
    title: "Boutique Hotel Booking",
    category: "Websites",
    desc: "Premium marketing website and direct booking engine for a luxury boutique hotel.",
    tech: ["Vite", "React", "Stripe API"],
    demoUrl: "#",
    githubUrl: "#",
    color: "bg-stone-900"
  },
  {
    id: 6,
    title: "FinTrack Personal Finance",
    category: "Mobile Apps",
    desc: "Mobile application for tracking expenses, setting budgets, and visualizing spending habits.",
    tech: ["Flutter", "Node.js", "MongoDB"],
    demoUrl: "#",
    githubUrl: "#",
    color: "bg-indigo-900"
  }
];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? portfolio 
    : portfolio.filter(p => p.category === filter);

  return (
    <>
      <SEO title="Our Work" description="Explore the portfolio of websites, mobile apps, and systems built by Nullryns." />
      
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 text-foreground"
          >
            Featured Work.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-sans text-muted-foreground mb-12"
          >
            A selection of projects that showcase our technical depth and design precision.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-sans font-medium transition-all duration-300 ${
                  filter === cat 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "bg-secondary/10 text-foreground hover:bg-secondary/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background min-h-[50vh]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div layout className="grid md:grid-cols-2 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Placeholder Image Space */}
                  <div className={`h-64 w-full ${project.color} relative overflow-hidden flex items-center justify-center`}>
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite_linear]" />
                    <span className="text-white/50 font-serif text-2xl font-bold tracking-widest uppercase">{project.category}</span>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-serif font-bold text-foreground">{project.title}</h3>
                      <span className="text-xs font-semibold px-3 py-1 bg-accent/20 text-primary rounded-full uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground font-sans mb-6 line-clamp-2">
                      {project.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map(t => (
			<span
			  key={t} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
			  {t}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4">
                      <Button variant="default" size="sm" className="flex-1 gap-2" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 gap-2" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" /> View Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-muted-foreground font-sans">
              No projects found in this category.
            </div>
          )}
        </div>
      </section>
    </>
  );
}

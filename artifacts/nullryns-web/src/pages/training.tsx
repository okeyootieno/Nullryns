import { SEO } from "@/components/seo";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Laptop, Users, Code, Server, Smartphone, CheckCircle } from "lucide-react";
import { Link } from "wouter";

const curriculum = [
  { icon: <Code />, title: "HTML, CSS, JS", desc: "The foundational building blocks of the web. Semantic structure, responsive styling, and dynamic scripting." },
  { icon: <Monitor />, title: "React & Modern UI", desc: "Component-driven architecture, state management, and building performant user interfaces." },
  { icon: <Server />, title: "Node.js & Backend", desc: "Creating robust APIs, understanding server logic, and integrating third-party services." },
  { icon: <Database />, title: "Databases (SQL & NoSQL)", desc: "Data modeling, migrations, query optimization using PostgreSQL and MongoDB." },
  { icon: <Smartphone />, title: "Mobile Dev", desc: "Translating web skills to native mobile experiences using React Native/Expo." }
];

// Need to import Monitor and Database since they weren't in the original lucide import
import { Monitor, Database } from "lucide-react";

export default function Training() {
  return (
    <>
      <SEO title="Developer Mentorship & Training" description="Join the Nullryns developer training program and learn full-stack development." />
      
      <section className="pt-32 pb-20 bg-primary text-primary-foreground overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
           <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
             <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
             <path d="M6 12v5c3 3 9 3 12 0v-5" />
           </svg>
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 max-w-4xl leading-[1.1]"
          >
            Grow Your Roots in Software Engineering.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-sans text-primary-foreground/80 max-w-2xl mb-10 leading-relaxed"
          >
            A practical, project-based mentorship program designed to take you from fundamentals to shipping real client applications.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <Link href="/contact">
              <Button size="lg" className="h-14 px-8 text-lg bg-accent text-primary hover:bg-white rounded-full">
                Apply for Mentorship
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-6">What We Teach</h2>
            <p className="text-lg text-muted-foreground font-sans">We don't just teach syntax. We teach you how to think like an engineer, architect systems, and write production-grade code.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {curriculum.map((item, i) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 text-primary flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground font-sans">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-accent/10 border-y border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-foreground mb-8">The Learning Path</h2>
              
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary/50 before:to-transparent">
                
                {[
                  { step: "01", title: "Fundamentals", desc: "Mastering the core languages of the web." },
                  { step: "02", title: "Practical Projects", desc: "Building clones and mini-apps to solidify concepts." },
                  { step: "03", title: "Team Collaboration", desc: "Learning Git, agile workflows, and code reviews." },
                  { step: "04", title: "Real Client Projects", desc: "Working alongside senior engineers on actual client deliverables." }
                ].map((item, i) => (
                  <div key={item.step} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-primary text-primary-foreground font-bold font-serif shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                      {item.step}
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-card p-6 rounded-xl border border-border shadow-sm">
                      <h4 className="font-serif font-bold text-xl text-foreground mb-2">{item.title}</h4>
                      <p className="text-muted-foreground font-sans text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
            
            <div className="bg-primary text-primary-foreground rounded-3xl p-10 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                   <circle cx="12" cy="12" r="10" />
                   <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                   <path d="M2 12h20" />
                 </svg>
               </div>
               <div className="relative z-10">
                 <h3 className="text-3xl font-serif font-bold mb-6">Why learn with Øryns?</h3>
                 <ul className="space-y-4 font-sans text-lg text-primary-foreground/90 mb-10">
                   <li className="flex items-start gap-3">
                     <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                     <span>Learn from active senior engineers</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                     <span>Work on real production codebases</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                     <span>Build a portfolio of actual projects</span>
                   </li>
                   <li className="flex items-start gap-3">
                     <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                     <span>Direct pathway to employment for top performers</span>
                   </li>
                 </ul>
                 <Link href="/contact">
                   <Button size="lg" className="w-full bg-accent text-primary hover:bg-white text-lg h-14">
                     Apply Now
                   </Button>
                 </Link>
               </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

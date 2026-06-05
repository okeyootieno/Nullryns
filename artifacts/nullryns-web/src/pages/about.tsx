import { SEO } from "@/components/seo";
import { motion } from "framer-motion";
import { Target, Lightbulb, Shield, TrendingUp, Users, Award } from "lucide-react";

export default function About() {
  const values = [
    { icon: <Lightbulb />, title: "Innovation", desc: "Pushing boundaries to craft forward-thinking solutions." },
    { icon: <Shield />, title: "Integrity", desc: "Building trust through transparency and honest work." },
    { icon: <TrendingUp />, title: "Growth", desc: "Continuous learning and nurturing the next generation." },
    { icon: <Users />, title: "Collaboration", desc: "Working as an extension of your team." },
    { icon: <Award />, title: "Excellence", desc: "Uncompromising quality in every line of code." }
  ];

  return (
    <>
      <SEO title="About Us" description="Learn about Nullryns (Øryns), our mission, vision, and core values." />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            Our Roots.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-sans max-w-3xl text-primary-foreground/80 leading-relaxed"
          >
            Nullryns (Øryns) is a collective of passionate builders based in Kenya. We believe technology should elevate lives, streamline businesses, and empower communities.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">From "Null" to Branching Possibilities</h2>
              <div className="space-y-6 text-lg text-muted-foreground font-sans">
                <p>
                  Our name blends "Null"—the absolute zero in code from which all logic begins—with "Øryns," a reflection of our origins and roots. Just like a seed starting from nothing, we build complex, life-changing systems from scratch.
                </p>
                <p>
                  Our brand symbol, the tree, represents our philosophy: deep technical roots, strong architectural trunks, and branching possibilities for our clients and the developers we mentor.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative h-[500px] rounded-2xl bg-secondary/10 flex items-center justify-center p-12 border border-border">
               <svg viewBox="0 0 100 100" className="w-full h-full text-primary opacity-20">
                 <path d="M50 90C50 90 40 85 45 65C50 45 35 40 30 35C25 30 20 35 20 35C20 35 25 25 35 25C45 25 45 35 50 45C55 35 55 25 65 25C75 25 80 35 80 35C80 35 75 30 70 35C65 40 50 45 55 65C60 85 50 90 50 90Z" fill="currentColor" />
               </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-24 bg-accent/10 border-y border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card p-10 rounded-2xl border border-border shadow-sm">
              <Target className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-3xl font-serif font-bold mb-4 text-foreground">Our Mission</h3>
              <p className="text-lg text-muted-foreground font-sans">
                To build high-quality, scalable digital solutions that solve real business problems, while bridging the tech skills gap in Kenya through practical, hands-on mentorship.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-primary text-primary-foreground p-10 rounded-2xl shadow-xl">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mb-6 text-accent">
                <path d="M2 12h20M12 2v20" />
                <circle cx="12" cy="12" r="6" />
              </svg>
              <h3 className="text-3xl font-serif font-bold mb-4">Our Vision</h3>
              <p className="text-lg text-primary-foreground/80 font-sans">
                To be Africa's most trusted software collective, recognized equally for the world-class products we build and the exceptional technical leaders we forge.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Core Values</h2>
            <p className="text-lg text-muted-foreground font-sans">The principles that guide our code, our culture, and our client relationships.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div 
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-border rounded-2xl bg-card hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-accent/20 text-primary flex items-center justify-center mb-6">
                  {val.icon}
                </div>
                <h4 className="text-2xl font-serif font-bold mb-3 text-foreground">{val.title}</h4>
                <p className="text-muted-foreground font-sans">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

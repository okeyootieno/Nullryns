import { SEO } from "@/components/seo";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Database, GraduationCap, Palette, Cpu, Briefcase, Globe } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: <Globe />,
    title: "Web Development",
    desc: "Marketing sites, portfolios, and corporate websites built with modern technologies for speed and SEO."
  },
  {
    icon: <Monitor />,
    title: "Web Applications",
    desc: "Complex, interactive web apps (React, Node) tailored to your specific operational workflows."
  },
  {
    icon: <Smartphone />,
    title: "Mobile Development",
    desc: "Native and cross-platform mobile apps for iOS and Android that users love."
  },
  {
    icon: <Database />,
    title: "Business Systems",
    desc: "Custom CRM, ERP, and internal management systems to digitize and automate your business."
  },
  {
    icon: <GraduationCap />,
    title: "Developer Training",
    desc: "Practical, project-based mentorship for aspiring developers to bridge the skills gap."
  },
  {
    icon: <Palette />,
    title: "UI/UX Design",
    desc: "User-centric interface design, wireframing, and prototyping for digital products."
  },
  {
    icon: <Cpu />,
    title: "API Development",
    desc: "Robust, secure backend APIs to power your applications and integrations."
  },
  {
    icon: <Briefcase />,
    title: "Software Consulting",
    desc: "Technical strategy, architecture planning, and technology stack recommendations."
  }
];

export default function Services() {
  return (
    <>
      <SEO title="Our Services" description="Explore the software development and mentorship services offered by Nullryns." />
      
      <section className="pt-32 pb-20 bg-background border-b border-border">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 text-foreground"
          >
            Digital Craftsmanship.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl font-sans text-muted-foreground leading-relaxed"
          >
            From stunning marketing websites to complex enterprise systems. We build technology that works as beautifully as it looks.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-accent/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv, i) => (
              <motion.div 
                key={srv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <div className="[&>svg]:w-7 [&>svg]:h-7">{srv.icon}</div>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3 text-foreground">{srv.title}</h3>
                <p className="text-muted-foreground font-sans leading-relaxed">{srv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Need a custom solution?</h2>
          <p className="text-xl text-primary-foreground/80 font-sans mb-10">
            Let's discuss your specific business challenges. We architect tailored systems that scale with you.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="h-14 px-10 text-lg rounded-full">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

import { SEO } from "@/components/seo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const team = [
  {
    id: "telvin",
    name: "Telvin Ochieng",
    role: "Founder & Lead Software Engineer",
    skills: ["Architecture", "Backend", "Strategy", "Leadership"],
    bio: "As the founder of Nullryns, Telvin drives the technical vision and architectural decisions for major client systems. With deep expertise in scalable backend development and a passion for leadership, he mentors the team to deliver engineering excellence."
  },
  {
    id: "clinton",
    name: "Clinton Nzau",
    role: "Full Stack Developer",
    skills: ["Frontend", "Backend Integration", "DB Design"],
    bio: "Clinton bridges the gap between elegant interfaces and robust databases. His full-stack capabilities ensure that data flows seamlessly from the server to the user, creating cohesive and performant web applications."
  },
  {
    id: "michael",
    name: "Michael Mike",
    role: "Software Developer",
    skills: ["App Dev", "Testing", "Maintenance"],
    bio: "Michael is obsessed with reliability. He builds, tests, and maintains applications with an eagle eye for detail, ensuring that the software Nullryns ships is virtually bug-free and highly maintainable."
  },
  {
    id: "gildysia",
    name: "Gildysia Naomi",
    role: "UI/UX Designer & Product Specialist",
    skills: ["UX Design", "Product Research", "Interface Design"],
    bio: "Gildysia translates complex business requirements into intuitive, beautiful user experiences. Her research-driven design process ensures that every product we build isn't just functional, but a joy to use."
  },
  {
    id: "stephen",
    name: "Stephen Githu",
    role: "Mobile App Developer",
    skills: ["Android", "iOS", "Mobile Optimization"],
    bio: "Stephen brings ideas to the palm of your hand. Specializing in native and cross-platform mobile development, he crafts fluid, performant apps optimized for the diverse mobile landscape."
  },
  {
    id: "levince",
    name: "Levince Okeyo",
    role: "Software Engineer & Solutions Architect",
    skills: ["System Design", "Client Solutions", "Business Analysis"],
    bio: "Levince excels at the intersection of business and technology. He analyzes client workflows and designs sophisticated system architectures that directly solve complex operational bottlenecks."
  }
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<typeof team[0] | null>(null);

  return (
    <>
      <SEO title="Our Team" description="Meet the passionate builders and mentors at Nullryns (Øryns)." />
      
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 text-foreground"
          >
            The Collective.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl font-sans text-muted-foreground"
          >
            A tight-knit team of engineers, designers, and architects dedicated to building extraordinary software.
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-accent/5 pb-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setSelectedMember(member)}
                className="group cursor-pointer bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/40 transition-all duration-300"
              >
                <div className="aspect-square relative overflow-hidden bg-secondary/10 flex items-center justify-center p-8">
                   <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors z-10" />
                   <Avatar className="w-full h-full max-w-[200px] max-h-[200px] rounded-full border-4 border-background shadow-lg transition-transform duration-500 group-hover:scale-105">
                     <AvatarFallback className="bg-primary text-primary-foreground font-serif text-5xl">
                       {member.name.split(" ").map(n => n[0]).join("")}
                     </AvatarFallback>
                   </Avatar>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                  <p className="text-sm font-sans text-accent font-semibold tracking-wide uppercase mb-4">{member.role}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="text-xs bg-secondary/10 text-secondary-foreground px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
        <DialogContent className="max-w-2xl bg-card">
          {selectedMember && (
            <>
              <DialogHeader>
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left mb-6">
                  <Avatar className="w-32 h-32 border-4 border-border shadow-md">
                     <AvatarFallback className="bg-primary text-primary-foreground font-serif text-4xl">
                       {selectedMember.name.split(" ").map(n => n[0]).join("")}
                     </AvatarFallback>
                  </Avatar>
                  <div className="pt-2">
                    <DialogTitle className="text-3xl font-serif font-bold text-foreground mb-2">
                      {selectedMember.name}
                    </DialogTitle>
                    <p className="text-accent font-semibold font-sans tracking-wide uppercase mb-4">
                      {selectedMember.role}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {selectedMember.skills.map(skill => (
                        <span key={skill} className="text-xs font-mono bg-secondary/10 text-secondary-foreground px-2 py-1 rounded border border-border">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogHeader>
              <DialogDescription className="text-lg text-muted-foreground font-sans leading-relaxed">
                {selectedMember.bio}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

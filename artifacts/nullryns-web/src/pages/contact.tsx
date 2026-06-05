import { SEO } from "@/components/seo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Mail, Github, MapPin, Send } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: ""
    }
  });

  const onSubmit = (data: FormValues) => {
    submitContact.mutate({ data }, {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description: "We've received your inquiry and will be in touch shortly.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <>
      <SEO title="Contact Us" description="Get in touch with Nullryns for software development projects or mentorship." />
      
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 text-foreground"
          >
            Let's Talk.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl font-sans text-muted-foreground"
          >
            Ready to start a project or join our mentorship program? Reach out to our team today.
          </motion.p>
        </div>
      </section>

      <section className="pb-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-24">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-10"
            >
              <div className="bg-card border border-border p-8 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-8">Contact Information</h3>
                
                <div className="space-y-6 font-sans">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-1">Email</p>
                      <a href="mailto:Nullryns@atomicmail.com" className="text-lg text-foreground hover:text-primary transition-colors">
                        Nullryns@atomicmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-1">Location</p>
                      <p className="text-lg text-foreground">Kenya</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-1">GitHub</p>
                      <a href="https://github.com/Nullryns" target="_blank" rel="noopener noreferrer" className="text-lg text-foreground hover:text-primary transition-colors">
                        github.com/Nullryns
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 -mr-10 -mb-10">
                  <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">Business Hours</h3>
                <p className="font-sans text-primary-foreground/80 mb-2 relative z-10">Monday - Friday</p>
                <p className="text-xl font-bold font-sans relative z-10">9:00 AM - 6:00 PM (EAT)</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="lg:col-span-3 bg-card border border-border p-8 md:p-10 rounded-2xl shadow-sm"
            >
              <h3 className="text-3xl font-serif font-bold text-foreground mb-8">Send us a message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-sans">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" className="bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="jane@example.com" className="bg-background" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+254 700 000 000" className="bg-background" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Inc." className="bg-background" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">How can we help you?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="web-development">Web Development</SelectItem>
                            <SelectItem value="mobile-apps">Mobile Apps</SelectItem>
                            <SelectItem value="business-systems">Business Systems</SelectItem>
                            <SelectItem value="mentorship">Mentorship Program</SelectItem>
                            <SelectItem value="other">Other Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Project Details / Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project goals or mentorship inquiry..." 
                            className="min-h-[150px] bg-background resize-y" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-lg bg-primary hover:bg-secondary text-primary-foreground gap-2"
                    disabled={submitContact.isPending}
                  >
                    {submitContact.isPending ? "Sending..." : "Send Message"} 
                    {!submitContact.isPending && <Send className="w-5 h-5" />}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

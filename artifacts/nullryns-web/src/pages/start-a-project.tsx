import { useState } from "react";
import { SEO } from "@/components/seo";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitInquiry } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Building2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const SERVICE_TYPES = [
  "Website Development",
  "Web Application",
  "Mobile App (Android/iOS)",
  "Business Management System",
  "POS System",
  "School Management System",
  "API Development",
  "UI/UX Design",
  "Software Consulting",
  "Developer Training",
];

const BUDGET_RANGES = [
  "Under $500",
  "$500 – $1,000",
  "$1,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Let's discuss",
];

const TIMELINES = [
  "ASAP (1–2 weeks)",
  "1 Month",
  "2–3 Months",
  "3–6 Months",
  "Flexible",
];

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  serviceType: z.string().min(1, "Please select a service type"),
  budgetRange: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  description: z.string().min(10, "Please provide more details about your project"),
});

type FormValues = z.infer<typeof formSchema>;

export default function StartAProject() {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const submitInquiry = useSubmitInquiry();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      serviceType: "",
      budgetRange: "",
      timeline: "",
      description: "",
    },
    mode: "onTouched",
  });

  const handleNextStep = async () => {
    const isValid = await form.trigger(["fullName", "email", "phone", "company"]);
    if (isValid) setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const onSubmit = (data: FormValues) => {
    submitInquiry.mutate(
      { data },
      {
        onSuccess: () => {
          setIsSuccess(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
        onError: () => {
          toast({
            title: "Submission Failed",
            description: "There was an error submitting your project brief. Please try again.",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (isSuccess) {
    return (
      <>
        <SEO
          title="Project Inquiry Received | Nullryns"
          description="Thank you for your project inquiry."
        />
        <section className="min-h-[80vh] flex items-center justify-center pt-32 pb-20 bg-background text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-8">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">
              We've received your brief.
            </h1>
            <p className="text-xl text-muted-foreground font-sans max-w-lg mx-auto leading-relaxed">
              Thank you for trusting Nullryns with your vision. Our team will review your requirements and reach out within 24 hours to discuss the next steps.
            </p>
            <div className="pt-8">
              <Link href="/">
                <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-secondary text-primary-foreground">
                  Return to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Start a Project | Nullryns"
        description="Tell us about your project. Let's build something great together."
      />

      <section className="pt-40 pb-20 bg-background overflow-hidden relative">
        <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-3xl text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 text-foreground"
          >
            Let's Build Something Great.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl font-sans text-muted-foreground"
          >
            Tell us about your project and we'll get back to you within 24 hours.
          </motion.p>
        </div>

        <div className="container mx-auto px-6 md:px-12 max-w-3xl pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-card border border-border p-8 md:p-12 rounded-2xl shadow-sm relative"
          >
            {/* Step Indicator */}
            <div className="flex items-center justify-between mb-8 border-b border-border pb-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-sans transition-colors ${
                    step === 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/20 text-primary"
                  }`}
                >
                  1
                </div>
                <div
                  className={`h-1 w-12 rounded-full ${
                    step === 2 ? "bg-primary" : "bg-border"
                  } transition-colors`}
                />
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-sans transition-colors ${
                    step === 2
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  2
                </div>
              </div>
              <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Step {step} of 2
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <AnimatePresence mode="wait" initial={false}>
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <div className="mb-8">
                        <h2 className="text-3xl font-serif font-bold text-foreground mb-2">About You</h2>
                        <p className="text-muted-foreground">Let's get to know each other first.</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Jane Doe" className="bg-background h-12" {...field} />
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
                                <Input type="email" placeholder="jane@example.com" className="bg-background h-12" {...field} />
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
                              <FormLabel className="text-foreground">Phone Number (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="+254 700 000 000" className="bg-background h-12" {...field} value={field.value || ''} />
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
                              <FormLabel className="text-foreground">Company (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Acme Inc." className="bg-background h-12" {...field} value={field.value || ''} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="pt-6 flex justify-end">
                        <Button 
                          type="button" 
                          onClick={handleNextStep}
                          size="lg" 
                          className="h-14 px-8 text-lg bg-primary hover:bg-secondary text-primary-foreground gap-2"
                        >
                          Next Step <ArrowRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6"
                    >
                      <div className="mb-8 flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-3xl font-serif font-bold text-foreground mb-2">Your Project</h2>
                          <p className="text-muted-foreground">Tell us what you're looking to build.</p>
                        </div>
                        {form.watch("company") && (
                          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                            <Building2 className="w-4 h-4" />
                            {form.watch("company")}
                          </div>
                        )}
                      </div>

                      <FormField
                        control={form.control}
                        name="serviceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Service Required *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background h-12">
                                  <SelectValue placeholder="Select a service type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {SERVICE_TYPES.map(type => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="budgetRange"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Budget Range *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-background h-12">
                                    <SelectValue placeholder="Select budget" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {BUDGET_RANGES.map(range => (
                                    <SelectItem key={range} value={range}>{range}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="timeline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-foreground">Expected Timeline *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="bg-background h-12">
                                    <SelectValue placeholder="Select timeline" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {TIMELINES.map(time => (
                                    <SelectItem key={time} value={time}>{time}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Project Description *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Please describe your project goals, features, and target audience..."
                                className="min-h-[150px] bg-background resize-y text-base p-4"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {submitInquiry.isError && (
                        <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
                          Failed to submit inquiry. Please check your connection and try again.
                        </div>
                      )}

                      <div className="pt-6 flex flex-col-reverse md:flex-row justify-between gap-4">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={handlePrevStep}
                          size="lg" 
                          className="h-14 px-8 text-lg gap-2"
                        >
                          <ArrowLeft className="w-5 h-5" /> Back
                        </Button>
                        <Button 
                          type="submit" 
                          size="lg" 
                          disabled={submitInquiry.isPending}
                          className="h-14 px-10 text-lg bg-primary hover:bg-secondary text-primary-foreground gap-2 w-full md:w-auto"
                        >
                          {submitInquiry.isPending ? "Submitting..." : "Submit Project Brief"}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </Form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
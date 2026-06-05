import { SEO } from "@/components/seo";
import { useListContactMessages } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function Admin() {
  const { data: messages, isLoading, isError } = useListContactMessages();

  return (
    <>
      <SEO title="Admin - Messages" description="View contact messages." />
      
      <section className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl font-serif font-bold mb-8 text-foreground"
          >
            Contact Messages
          </motion.h1>
          
          {isLoading && (
            <div className="text-muted-foreground font-sans animate-pulse">Loading messages...</div>
          )}
          
          {isError && (
            <div className="text-destructive font-sans">Error loading messages. Please try again later.</div>
          )}
          
          {messages && messages.length === 0 && (
            <div className="text-muted-foreground font-sans p-8 border border-border rounded-xl bg-card">No messages found.</div>
          )}

          {messages && messages.length > 0 && (
            <div className="grid gap-6">
              {messages.map((msg, i) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border p-6 rounded-xl shadow-sm"
                >
                  <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                    <div>
                      <h3 className="text-lg font-serif font-bold text-foreground">{msg.fullName}</h3>
                      <a href={`mailto:${msg.email}`} className="text-primary hover:underline text-sm font-sans">{msg.email}</a>
                      {msg.phone && <p className="text-muted-foreground text-sm font-sans">{msg.phone}</p>}
                    </div>
                    <div className="text-right text-sm text-muted-foreground font-sans">
                      <p>{format(new Date(msg.createdAt), "PPP p")}</p>
                      {msg.service && <span className="inline-block mt-2 px-2 py-1 bg-secondary/10 text-secondary-foreground rounded text-xs border border-border">{msg.service}</span>}
                    </div>
                  </div>
                  
                  {msg.company && (
                    <p className="text-sm font-sans text-foreground mb-4">
                      <span className="font-semibold text-muted-foreground">Company:</span> {msg.company}
                    </p>
                  )}
                  
                  <div className="bg-background border border-border rounded p-4 text-foreground font-sans whitespace-pre-wrap text-sm">
                    {msg.message}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

import { useState, useEffect } from "react";
import { SEO } from "@/components/seo";
import { Link } from "wouter";
import { 
  useListContactMessages, 
  useListInquiries, 
  useUpdateInquiryStatus,
  getListInquiriesQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// --- Components ---

function LastUpdated({ timestamp }: { timestamp: number }) {
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    setSecondsAgo(Math.floor((Date.now() - timestamp) / 1000));
    const interval = setInterval(() => {
      setSecondsAgo(Math.floor((Date.now() - timestamp) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [timestamp]);

  return <span className="text-xs text-muted-foreground font-sans">Last updated: {secondsAgo} seconds ago</span>;
}

function TextExpander({ text, lines = 3 }: { text: string; lines?: number }) {
  const [expanded, setExpanded] = useState(false);
  
  if (!text) return null;

  return (
    <div className="bg-background/50 border border-border rounded p-4 text-foreground font-sans text-sm mt-3">
      <div className={`${expanded ? "" : "line-clamp-3"} whitespace-pre-wrap`}>
        {text}
      </div>
      {(text.split("\n").length > lines || text.length > 150) && (
        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 mt-2 font-medium"
        >
          {expanded ? (
            <><ChevronUp className="w-3 h-3" /> Show less</>
          ) : (
            <><ChevronDown className="w-3 h-3" /> Read more</>
          )}
        </button>
      )}
    </div>
  );
}

const statusColors: Record<string, string> = {
  "new": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  "in-discussion": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  "quoted": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  "closed": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
};

export default function Admin() {
  const queryClient = useQueryClient();
  const [lastFetchTime, setLastFetchTime] = useState(Date.now());

  const { data: messages, isLoading: loadingMessages, isError: errorMessages, isFetching: fetchingMessages } = useListContactMessages({
    query: { refetchInterval: 30000 }
  });

  const { data: inquiries, isLoading: loadingInquiries, isError: errorInquiries, isFetching: fetchingInquiries } = useListInquiries({
    query: { refetchInterval: 30000 }
  });

  const updateStatus = useUpdateInquiryStatus();

  // Update the last fetch time whenever either query fetches
  useEffect(() => {
    if (!fetchingMessages && !fetchingInquiries) {
      setLastFetchTime(Date.now());
    }
  }, [fetchingMessages, fetchingInquiries]);

  const handleStatusChange = (id: number, newStatus: string) => {
    updateStatus.mutate(
      { id, data: { status: newStatus as any } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListInquiriesQueryKey() });
        }
      }
    );
  };

  const sortedMessages = [...(messages || [])].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const sortedInquiries = [...(inquiries || [])].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO title="Admin Dashboard" description="Internal admin dashboard." />
      
      {/* Minimal Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.jpg" alt="Øryns logo" className="w-10 h-10 rounded-full object-cover shadow-sm" />
            <h1 className="font-serif text-2xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            &larr; Back to site
          </Link>
        </div>
      </header>

      {/* Main Content Panels */}
      <main className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Panel: Contact Messages */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-xl font-semibold">Contact Messages</h2>
                <Badge variant="secondary" className="font-sans font-medium">{sortedMessages.length}</Badge>
              </div>
              <LastUpdated timestamp={lastFetchTime} />
            </div>

            {loadingMessages && <div className="p-8 text-center text-muted-foreground animate-pulse border border-border rounded-xl bg-card">Loading messages...</div>}
            {errorMessages && <div className="p-8 text-center text-destructive border border-destructive/20 rounded-xl bg-destructive/10">Error loading messages</div>}
            
            {sortedMessages && sortedMessages.length === 0 && (
              <div className="p-12 text-center text-muted-foreground border border-border border-dashed rounded-xl bg-card/50 flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </div>
                <p>No messages yet</p>
              </div>
            )}

            <div className="grid gap-4">
              <AnimatePresence>
                {sortedMessages.map((msg, i) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.05, 0.5) }}
                    className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div>
                        <h3 className="font-serif text-lg font-bold">{msg.fullName}</h3>
                        <a href={`mailto:${msg.email}`} className="text-primary hover:underline text-sm inline-block">{msg.email}</a>
                        {msg.phone && <span className="text-muted-foreground text-sm ml-2">({msg.phone})</span>}
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground block">{format(new Date(msg.createdAt), "MMM d, yyyy")}</span>
                        <span className="text-xs text-muted-foreground block">{format(new Date(msg.createdAt), "h:mm a")}</span>
                      </div>
                    </div>
                    
                    {(msg.company || msg.service) && (
                      <div className="flex flex-wrap gap-2 mt-3 mb-1">
                        {msg.company && <Badge variant="outline" className="bg-background text-xs font-normal">🏢 {msg.company}</Badge>}
                        {msg.service && <Badge className="bg-[#C4A484]/20 text-[#3B2A1E] dark:text-[#C4A484] hover:bg-[#C4A484]/30 border-none font-normal text-xs">{msg.service}</Badge>}
                      </div>
                    )}
                    
                    <TextExpander text={msg.message} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* Panel: Project Inquiries */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-xl font-semibold">Project Inquiries</h2>
                <Badge variant="secondary" className="font-sans font-medium">{sortedInquiries.length}</Badge>
              </div>
              <LastUpdated timestamp={lastFetchTime} />
            </div>

            {loadingInquiries && <div className="p-8 text-center text-muted-foreground animate-pulse border border-border rounded-xl bg-card">Loading inquiries...</div>}
            {errorInquiries && <div className="p-8 text-center text-destructive border border-destructive/20 rounded-xl bg-destructive/10">Error loading inquiries</div>}
            
            {sortedInquiries && sortedInquiries.length === 0 && (
              <div className="p-12 text-center text-muted-foreground border border-border border-dashed rounded-xl bg-card/50 flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <p>No inquiries yet</p>
              </div>
            )}

            <div className="grid gap-4">
              <AnimatePresence>
                {sortedInquiries.map((inquiry, i) => {
                  const isMutating = updateStatus.isPending && updateStatus.variables?.id === inquiry.id;
                  
                  return (
                    <motion.div 
                      key={inquiry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.05, 0.5) }}
                      className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                      {isMutating && (
                        <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                          <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                      )}
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 pb-4 border-b border-border/50">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-serif text-lg font-bold">{inquiry.fullName}</h3>
                            <Badge className={`font-medium capitalize ${statusColors[inquiry.status] || "bg-secondary text-secondary-foreground"}`}>
                              {inquiry.status.replace("-", " ")}
                            </Badge>
                          </div>
                          <a href={`mailto:${inquiry.email}`} className="text-primary hover:underline text-sm inline-block">{inquiry.email}</a>
                          {inquiry.phone && <span className="text-muted-foreground text-sm ml-2">({inquiry.phone})</span>}
                          {inquiry.company && <div className="text-sm font-medium mt-1 text-foreground">🏢 {inquiry.company}</div>}
                        </div>
                        
                        <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                          <div className="text-right w-full">
                            <span className="text-xs text-muted-foreground block">{format(new Date(inquiry.createdAt), "MMM d, yyyy")}</span>
                          </div>
                          <div className="w-full sm:w-36 mt-1">
                            <Select 
                              value={inquiry.status} 
                              onValueChange={(val) => handleStatusChange(inquiry.id, val)}
                              disabled={isMutating}
                            >
                              <SelectTrigger className="h-8 text-xs bg-background">
                                <SelectValue placeholder="Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="in-discussion">In Discussion</SelectItem>
                                <SelectItem value="quoted">Quoted</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-sm">
                        <div className="bg-secondary/10 p-3 rounded-lg border border-border">
                          <span className="block text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Service Type</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#C4A484]"></div>
                            <span className="font-medium text-foreground">{inquiry.serviceType}</span>
                          </div>
                        </div>
                        
                        <div className="bg-secondary/10 p-3 rounded-lg border border-border flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Budget</span>
                            <span className="font-medium">{inquiry.budgetRange}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Timeline</span>
                            <span className="font-medium">{inquiry.timeline}</span>
                          </div>
                        </div>
                      </div>
                      
                      <TextExpander text={inquiry.description} lines={2} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

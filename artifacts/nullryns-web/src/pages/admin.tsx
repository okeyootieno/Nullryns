import { useState, useEffect, useCallback } from "react";
import { SEO } from "@/components/seo";
import { Link } from "wouter";
import {
  useListContactMessages,
  useListInquiries,
  useUpdateInquiryStatus,
  getListInquiriesQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Loader2, LogOut, Lock, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

async function apiFetch(path: string, options?: RequestInit) {
  return fetch(`${BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options?.headers ?? {}) },
  });
}

// --- Auth hook ---
type AuthState = "loading" | "unauthenticated" | "authenticated";

function useAdminAuth() {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const checkSession = useCallback(async () => {
    try {
      const res = await apiFetch("/api/admin/session");
      const data = await res.json();
      setAuthState(data.authenticated ? "authenticated" : "unauthenticated");
    } catch {
      setAuthState("unauthenticated");
    }
  }, []);

  useEffect(() => { checkSession(); }, [checkSession]);

  const login = useCallback(async (pin: string) => {
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await apiFetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ pin }),
      });
      if (res.ok) {
        setAuthState("authenticated");
      } else {
        const data = await res.json();
        setLoginError(data.error ?? "Incorrect PIN. Please try again.");
      }
    } catch {
      setLoginError("Connection error. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await apiFetch("/api/admin/logout", { method: "POST" });
    setAuthState("unauthenticated");
  }, []);

  return { authState, loginError, loggingIn, login, logout };
}

// --- PIN Gate Screen ---
function PinGate({ onLogin, error, loading }: {
  onLogin: (pin: string) => void;
  error: string;
  loading: boolean;
}) {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim()) onLogin(pin.trim());
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <SEO title="Admin Login" description="Admin access" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <img src="/logo.jpg" alt="Øryns" className="w-16 h-16 rounded-full object-cover mx-auto mb-4 shadow-md" />
          <h1 className="font-serif text-3xl font-bold text-foreground mb-1">Admin Access</h1>
          <p className="text-muted-foreground text-sm font-sans">Enter your PIN to continue</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium font-sans text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4" style={{ color: '#C4A484' }} />
                PIN
              </label>
              <div className="relative">
                <Input
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter your PIN"
                  autoFocus
                  autoComplete="current-password"
                  className="pr-10 font-mono text-lg tracking-widest"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 font-sans"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              disabled={loading || !pin.trim()}
              className="w-full bg-primary hover:bg-secondary text-primary-foreground h-11"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Verifying…</>
              ) : (
                "Access Dashboard"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 font-sans">
          <Link href="/" className="hover:text-foreground transition-colors">← Back to site</Link>
        </p>
      </motion.div>
    </div>
  );
}

// --- Reusable sub-components ---
function LastUpdated({ timestamp }: { timestamp: number }) {
  const [secondsAgo, setSecondsAgo] = useState(0);
  useEffect(() => {
    setSecondsAgo(Math.floor((Date.now() - timestamp) / 1000));
    const id = setInterval(() => setSecondsAgo(Math.floor((Date.now() - timestamp) / 1000)), 1000);
    return () => clearInterval(id);
  }, [timestamp]);
  return <span className="text-xs text-muted-foreground font-sans">Last updated: {secondsAgo}s ago</span>;
}

function TextExpander({ text, lines = 3 }: { text: string; lines?: number }) {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;
  return (
    <div className="bg-background/50 border border-border rounded p-4 text-foreground font-sans text-sm mt-3">
      <div className={`${expanded ? "" : "line-clamp-3"} whitespace-pre-wrap`}>{text}</div>
      {(text.split("\n").length > lines || text.length > 150) && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 mt-2 font-medium"
        >
          {expanded ? <><ChevronUp className="w-3 h-3" /> Show less</> : <><ChevronDown className="w-3 h-3" /> Read more</>}
        </button>
      )}
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  "new": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  "in-discussion": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  "quoted": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  "closed": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
};

// --- Main Dashboard ---
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const queryClient = useQueryClient();
  const [lastFetchTime, setLastFetchTime] = useState(Date.now());

  const { data: messages, isLoading: loadingMessages, isError: errorMessages, isFetching: fetchingMessages } =
    useListContactMessages({ query: { refetchInterval: 30000 } });

  const { data: inquiries, isLoading: loadingInquiries, isError: errorInquiries, isFetching: fetchingInquiries } =
    useListInquiries({ query: { refetchInterval: 30000 } });

  const updateStatus = useUpdateInquiryStatus();

  useEffect(() => {
    if (!fetchingMessages && !fetchingInquiries) setLastFetchTime(Date.now());
  }, [fetchingMessages, fetchingInquiries]);

  const handleStatusChange = (id: number, newStatus: string) => {
    updateStatus.mutate(
      { id, data: { status: newStatus as "new" | "in-discussion" | "quoted" | "closed" } },
      { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListInquiriesQueryKey() }) }
    );
  };

  const sortedMessages = [...(messages ?? [])].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const sortedInquiries = [...(inquiries ?? [])].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO title="Admin Dashboard" description="Internal admin dashboard." />

      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.jpg" alt="Øryns logo" className="w-10 h-10 rounded-full object-cover shadow-sm" />
            <h1 className="font-serif text-2xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              ← Back to site
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="flex items-center gap-2 text-muted-foreground hover:text-destructive hover:border-destructive/50"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Contact Messages */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-xl font-semibold">Contact Messages</h2>
                <Badge variant="secondary" className="font-sans font-medium">{sortedMessages.length}</Badge>
              </div>
              <LastUpdated timestamp={lastFetchTime} />
            </div>

            {loadingMessages && <div className="p-8 text-center text-muted-foreground animate-pulse border border-border rounded-xl bg-card">Loading messages…</div>}
            {errorMessages && <div className="p-8 text-center text-destructive border border-destructive/20 rounded-xl bg-destructive/10">Error loading messages</div>}

            {!loadingMessages && sortedMessages.length === 0 && (
              <div className="p-12 text-center text-muted-foreground border border-dashed border-border rounded-xl bg-card/50 flex flex-col items-center">
                <svg className="w-10 h-10 text-muted-foreground/40 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
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
                    transition={{ delay: Math.min(i * 0.05, 0.4) }}
                    className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div>
                        <h3 className="font-serif text-lg font-bold">{msg.fullName}</h3>
                        <a href={`mailto:${msg.email}`} className="text-primary hover:underline text-sm">{msg.email}</a>
                        {msg.phone && <span className="text-muted-foreground text-sm ml-2">({msg.phone})</span>}
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs text-muted-foreground block">{format(new Date(msg.createdAt), "MMM d, yyyy")}</span>
                        <span className="text-xs text-muted-foreground block">{format(new Date(msg.createdAt), "h:mm a")}</span>
                      </div>
                    </div>
                    {(msg.company || msg.service) && (
                      <div className="flex flex-wrap gap-2 mt-3 mb-1">
                        {msg.company && <Badge variant="outline" className="text-xs font-normal">{msg.company}</Badge>}
                        {msg.service && <Badge className="bg-[#C4A484]/20 text-[#3B2A1E] dark:text-[#C4A484] border-none font-normal text-xs">{msg.service}</Badge>}
                      </div>
                    )}
                    <TextExpander text={msg.message} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>

          {/* Project Inquiries */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border shadow-sm">
              <div className="flex items-center gap-3">
                <h2 className="font-serif text-xl font-semibold">Project Inquiries</h2>
                <Badge variant="secondary" className="font-sans font-medium">{sortedInquiries.length}</Badge>
              </div>
              <LastUpdated timestamp={lastFetchTime} />
            </div>

            {loadingInquiries && <div className="p-8 text-center text-muted-foreground animate-pulse border border-border rounded-xl bg-card">Loading inquiries…</div>}
            {errorInquiries && <div className="p-8 text-center text-destructive border border-destructive/20 rounded-xl bg-destructive/10">Error loading inquiries</div>}

            {!loadingInquiries && sortedInquiries.length === 0 && (
              <div className="p-12 text-center text-muted-foreground border border-dashed border-border rounded-xl bg-card/50 flex flex-col items-center">
                <svg className="w-10 h-10 text-muted-foreground/40 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
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
                      transition={{ delay: Math.min(i * 0.05, 0.4) }}
                      className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                      {isMutating && (
                        <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                          <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 pb-4 border-b border-border/50">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-serif text-lg font-bold">{inquiry.fullName}</h3>
                            <Badge className={`font-medium capitalize text-xs ${STATUS_COLORS[inquiry.status] ?? "bg-secondary text-secondary-foreground"}`}>
                              {inquiry.status.replace("-", " ")}
                            </Badge>
                          </div>
                          <a href={`mailto:${inquiry.email}`} className="text-primary hover:underline text-sm">{inquiry.email}</a>
                          {inquiry.phone && <span className="text-muted-foreground text-sm ml-2">({inquiry.phone})</span>}
                          {inquiry.company && <div className="text-sm font-medium mt-1">{inquiry.company}</div>}
                        </div>
                        <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                          <span className="text-xs text-muted-foreground">{format(new Date(inquiry.createdAt), "MMM d, yyyy")}</span>
                          <Select
                            value={inquiry.status}
                            onValueChange={(val) => handleStatusChange(inquiry.id, val)}
                            disabled={isMutating}
                          >
                            <SelectTrigger className="h-8 text-xs bg-background w-36">
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-sm">
                        <div className="bg-secondary/10 p-3 rounded-lg border border-border">
                          <span className="block text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Service Type</span>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#C4A484' }} />
                            <span className="font-medium">{inquiry.serviceType}</span>
                          </div>
                        </div>
                        <div className="bg-secondary/10 p-3 rounded-lg border border-border flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Budget</span>
                            <span className="font-medium">{inquiry.budgetRange ?? "—"}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Timeline</span>
                            <span className="font-medium">{inquiry.timeline ?? "—"}</span>
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

// --- Page root: auth gate ---
export default function Admin() {
  const { authState, loginError, loggingIn, login, logout } = useAdminAuth();

  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (authState === "unauthenticated") {
    return <PinGate onLogin={login} error={loginError} loading={loggingIn} />;
  }

  return <Dashboard onLogout={logout} />;
}

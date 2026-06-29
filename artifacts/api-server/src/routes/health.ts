import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";
import { db } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

// Lightweight liveness check — no DB, used by internal probes
router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

// Full readiness check — does a real SELECT 1 to keep Neon from scaling to zero.
// Hit this from cron-job.org every 4-5 minutes:
//   GET https://nullryns.onrender.com/api/health
router.get("/health", async (_req, res): Promise<void> => {
  const start = Date.now();
  try {
    await db.execute(sql`SELECT 1`);
    res.json({
      status: "ok",
      db: "reachable",
      latency_ms: Date.now() - start,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(503).json({
      status: "error",
      db: "unreachable",
      error: err?.message ?? "unknown",
      latency_ms: Date.now() - start,
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;

import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "@workspace/db";
import { inquiriesTable } from "@workspace/db";
import { SubmitInquiryBody, UpdateInquiryStatusBody } from "@workspace/api-zod";
import { requireAdmin } from "../middleware/requireAdmin";

const inquiriesRouter = Router();

const VALID_STATUSES = ["new", "in-discussion", "quoted", "closed"] as const;

function toJson(r: typeof inquiriesTable.$inferSelect) {
  return {
    id: r.id,
    fullName: r.fullName,
    email: r.email,
    phone: r.phone,
    company: r.company,
    serviceType: r.serviceType,
    budgetRange: r.budgetRange,
    timeline: r.timeline,
    description: r.description,
    status: r.status,
    createdAt: r.createdAt.toISOString(),
  };
}

inquiriesRouter.post("/inquiries", async (req, res) => {
  const parsed = SubmitInquiryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { fullName, email, phone, company, serviceType, budgetRange, timeline, description } = parsed.data;

  const [row] = await db
    .insert(inquiriesTable)
    .values({
      fullName,
      email,
      phone: phone ?? null,
      company: company ?? null,
      serviceType,
      budgetRange: budgetRange ?? null,
      timeline: timeline ?? null,
      description,
    })
    .returning();

  res.status(201).json(toJson(row));
});

inquiriesRouter.get("/inquiries", requireAdmin, async (req, res) => {
  const rows = await db.select().from(inquiriesTable).orderBy(inquiriesTable.createdAt);
  res.json(rows.map(toJson));
});

inquiriesRouter.patch("/inquiries/:id/status", requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id as string, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid inquiry ID" });
    return;
  }

  const parsed = UpdateInquiryStatusBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid status value" });
    return;
  }

  const { status } = parsed.data;
  if (!VALID_STATUSES.includes(status as typeof VALID_STATUSES[number])) {
    res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(", ")}` });
    return;
  }

  const [updated] = await db
    .update(inquiriesTable)
    .set({ status })
    .where(eq(inquiriesTable.id, id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Inquiry not found" });
    return;
  }

  res.json(toJson(updated));
});

export default inquiriesRouter;

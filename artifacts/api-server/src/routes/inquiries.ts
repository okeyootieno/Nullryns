import { Router } from "express";
import { db } from "@workspace/db";
import { inquiriesTable } from "@workspace/db";
import { SubmitInquiryBody } from "@workspace/api-zod";

const inquiriesRouter = Router();

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

  res.status(201).json({
    id: row.id,
    fullName: row.fullName,
    email: row.email,
    phone: row.phone,
    company: row.company,
    serviceType: row.serviceType,
    budgetRange: row.budgetRange,
    timeline: row.timeline,
    description: row.description,
    status: row.status,
    createdAt: row.createdAt.toISOString(),
  });
});

inquiriesRouter.get("/inquiries", async (req, res) => {
  const rows = await db
    .select()
    .from(inquiriesTable)
    .orderBy(inquiriesTable.createdAt);

  res.json(
    rows.map((r) => ({
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
    }))
  );
});

export default inquiriesRouter;

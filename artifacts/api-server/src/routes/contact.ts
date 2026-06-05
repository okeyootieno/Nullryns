import { Router } from "express";
import { db } from "@workspace/db";
import { contactMessagesTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";
import { requireAdmin } from "../middleware/requireAdmin";

const contactRouter = Router();

contactRouter.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { fullName, email, phone, company, service, message } = parsed.data;

  const [row] = await db
    .insert(contactMessagesTable)
    .values({ fullName, email, phone: phone ?? null, company: company ?? null, service: service ?? null, message })
    .returning();

  res.status(201).json({
    id: row.id,
    fullName: row.fullName,
    email: row.email,
    phone: row.phone,
    company: row.company,
    service: row.service,
    message: row.message,
    createdAt: row.createdAt.toISOString(),
  });
});

contactRouter.get("/contact", requireAdmin, async (req, res) => {
  const rows = await db.select().from(contactMessagesTable).orderBy(contactMessagesTable.createdAt);
  res.json(
    rows.map((r) => ({
      id: r.id,
      fullName: r.fullName,
      email: r.email,
      phone: r.phone,
      company: r.company,
      service: r.service,
      message: r.message,
      createdAt: r.createdAt.toISOString(),
    }))
  );
});

export default contactRouter;

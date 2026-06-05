import { Router } from "express";
import { db } from "@workspace/db";
import { contactMessagesTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";
import { requireAdmin } from "../middleware/requireAdmin";
import { sendContactNotification } from "../lib/email";

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
    isRead: row.isRead,
    createdAt: row.createdAt.toISOString(),
  });

  sendContactNotification({
    fullName: row.fullName,
    email: row.email,
    phone: row.phone,
    company: row.company,
    service: row.service,
    message: row.message,
  }).catch(() => {});
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
      isRead: r.isRead,
      createdAt: r.createdAt.toISOString(),
    }))
  );
});

contactRouter.patch("/contact/:id/read", requireAdmin, async (req, res) => {
  const id = parseInt(req.params.id as string, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid message ID" });
    return;
  }

  const { eq } = await import("drizzle-orm");
  const [updated] = await db
    .update(contactMessagesTable)
    .set({ isRead: true })
    .where(eq(contactMessagesTable.id, id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Message not found" });
    return;
  }

  res.json({
    id: updated.id,
    fullName: updated.fullName,
    email: updated.email,
    phone: updated.phone,
    company: updated.company,
    service: updated.service,
    message: updated.message,
    isRead: updated.isRead,
    createdAt: updated.createdAt.toISOString(),
  });
});

export default contactRouter;

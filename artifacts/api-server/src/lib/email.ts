import { Resend } from "resend";
import { logger } from "./logger";

const NOTIFY_TO = "Nullryns@atomicmail.com";
const FROM = "Nullryns Notifications <onboarding@resend.dev>";

let _client: Resend | null = null;

function getClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    logger.warn("RESEND_API_KEY is not set — email notifications disabled");
    return null;
  }
  if (!_client) {
    _client = new Resend(process.env.RESEND_API_KEY);
  }
  return _client;
}

export async function sendContactNotification(data: {
  fullName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
}) {
  const client = getClient();
  if (!client) return;

  const subject = `New Contact Message from ${data.fullName}`;
  const html = `
    <h2 style="color:#3B2A1E;font-family:sans-serif;">New Contact Message</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;font-weight:bold;color:#5E4634;width:140px;">Name</td><td style="padding:8px;">${esc(data.fullName)}</td></tr>
      <tr style="background:#FAF7F2;"><td style="padding:8px;font-weight:bold;color:#5E4634;">Email</td><td style="padding:8px;"><a href="mailto:${esc(data.email)}">${esc(data.email)}</a></td></tr>
      ${data.phone ? `<tr><td style="padding:8px;font-weight:bold;color:#5E4634;">Phone</td><td style="padding:8px;">${esc(data.phone)}</td></tr>` : ""}
      ${data.company ? `<tr style="background:#FAF7F2;"><td style="padding:8px;font-weight:bold;color:#5E4634;">Company</td><td style="padding:8px;">${esc(data.company)}</td></tr>` : ""}
      ${data.service ? `<tr><td style="padding:8px;font-weight:bold;color:#5E4634;">Service</td><td style="padding:8px;">${esc(data.service)}</td></tr>` : ""}
      <tr style="background:#FAF7F2;"><td style="padding:8px;font-weight:bold;color:#5E4634;vertical-align:top;">Message</td><td style="padding:8px;white-space:pre-wrap;">${esc(data.message)}</td></tr>
    </table>
    <p style="font-family:sans-serif;font-size:12px;color:#999;margin-top:24px;">Sent via Nullryns (Øryns) website contact form</p>
  `;

  try {
    const result = await client.emails.send({ from: FROM, to: NOTIFY_TO, subject, html });
    logger.info({ emailId: result.data?.id }, "Contact notification sent");
  } catch (err) {
    logger.error({ err }, "Failed to send contact notification email");
  }
}

export async function sendInquiryNotification(data: {
  fullName: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  serviceType: string;
  budgetRange?: string | null;
  timeline?: string | null;
  description: string;
}) {
  const client = getClient();
  if (!client) return;

  const subject = `New Project Inquiry from ${data.fullName}`;
  const html = `
    <h2 style="color:#3B2A1E;font-family:sans-serif;">New Project Inquiry</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;font-weight:bold;color:#5E4634;width:140px;">Name</td><td style="padding:8px;">${esc(data.fullName)}</td></tr>
      <tr style="background:#FAF7F2;"><td style="padding:8px;font-weight:bold;color:#5E4634;">Email</td><td style="padding:8px;"><a href="mailto:${esc(data.email)}">${esc(data.email)}</a></td></tr>
      ${data.phone ? `<tr><td style="padding:8px;font-weight:bold;color:#5E4634;">Phone</td><td style="padding:8px;">${esc(data.phone)}</td></tr>` : ""}
      ${data.company ? `<tr style="background:#FAF7F2;"><td style="padding:8px;font-weight:bold;color:#5E4634;">Company</td><td style="padding:8px;">${esc(data.company)}</td></tr>` : ""}
      <tr><td style="padding:8px;font-weight:bold;color:#5E4634;">Service Type</td><td style="padding:8px;">${esc(data.serviceType)}</td></tr>
      ${data.budgetRange ? `<tr style="background:#FAF7F2;"><td style="padding:8px;font-weight:bold;color:#5E4634;">Budget</td><td style="padding:8px;">${esc(data.budgetRange)}</td></tr>` : ""}
      ${data.timeline ? `<tr><td style="padding:8px;font-weight:bold;color:#5E4634;">Timeline</td><td style="padding:8px;">${esc(data.timeline)}</td></tr>` : ""}
      <tr style="background:#FAF7F2;"><td style="padding:8px;font-weight:bold;color:#5E4634;vertical-align:top;">Description</td><td style="padding:8px;white-space:pre-wrap;">${esc(data.description)}</td></tr>
    </table>
    <p style="font-family:sans-serif;font-size:12px;color:#999;margin-top:24px;">Sent via Nullryns (Øryns) website "Start a Project" form</p>
  `;

  try {
    const result = await client.emails.send({ from: FROM, to: NOTIFY_TO, subject, html });
    logger.info({ emailId: result.data?.id }, "Inquiry notification sent");
  } catch (err) {
    logger.error({ err }, "Failed to send inquiry notification email");
  }
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

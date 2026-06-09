import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin";

const adminAuthRouter = Router();

adminAuthRouter.post("/admin/login", (req, res) => {
  const { pin } = req.body as { pin?: string };
  const adminPin = process.env.ADMIN_PIN;

  if (!adminPin) {
    res.status(500).json({ error: "Admin PIN not configured" });
    return;
  }

  if (!pin || pin !== adminPin) {
    res.status(401).json({ error: "Incorrect PIN" });
    return;
  }

  req.session.isAdmin = true;

  console.log("SESSION ID:", req.sessionID);
  console.log("SESSION DATA:", req.session);

  req.session.save((err) => {
    if (err) {
      console.error("SESSION SAVE ERROR:", err);
      return res.status(500).json({ error: "Failed to save session" });
    }
    console.log("SESSION SAVED SUCCESSFULLY");
    return res.json({ ok: true });
  });
});

adminAuthRouter.post("/admin/logout", requireAdmin, (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
});

adminAuthRouter.get("/admin/session", (req, res) => {
  res.json({ authenticated: req.session?.isAdmin === true });
});

export default adminAuthRouter;

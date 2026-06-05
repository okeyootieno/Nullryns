import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import inquiriesRouter from "./inquiries";
import adminAuthRouter from "./adminAuth";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminAuthRouter);
router.use(contactRouter);
router.use(inquiriesRouter);

export default router;

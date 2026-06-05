import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import inquiriesRouter from "./inquiries";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(inquiriesRouter);

export default router;

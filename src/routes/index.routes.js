import { Router } from "express"
import baseRouter from "./base.routes";

const router = Router();

router.use(baseRouter);

export default router;
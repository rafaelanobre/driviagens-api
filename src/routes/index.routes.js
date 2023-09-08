import { Router } from "express"
import baseRouter from "./base.routes.js";

const router = Router();

router.use(baseRouter);

export default router;
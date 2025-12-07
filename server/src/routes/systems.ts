import { Router } from "express";
import { checkHealthy } from "controllers/systems"

const router = Router();

router.get("/ping", checkHealthy);

export default router;

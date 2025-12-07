import { Router } from "express";
import { fetchUserByID, addUser } from "controllers/users"

const router = Router();

router.get("/:id", fetchUserByID);
router.post("/", addUser);

export default router;

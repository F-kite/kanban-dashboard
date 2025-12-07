import { Router } from "express";
import { addPost, fetchPosts, removePost, updPostById } from "controllers/posts";

const router = Router();

router.get("/", fetchPosts);
router.post("/", addPost);
router.put("/:id", updPostById);
router.delete("/:id", removePost);

export default router;

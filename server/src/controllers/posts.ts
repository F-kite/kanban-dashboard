import { supabase } from "services/supabaseClient"
import type { IAddPost } from "types/posts"
import { logger } from "utils/logger"

const fetchPosts = async (req: any, res: any) => {
    const user_id = req.params

    if (!user_id) {
        logger.warn("Fetch posts: User ID is required", { params: req.params });
        return res.status(400).json({ error: "User ID is required" });
    }

    logger.info("Fetching posts for user", { user_id });
    const { data, error } = await supabase.from('posts').select('*').eq("user_id", user_id);

    if (error) {
        logger.error("Failed to fetch posts", { user_id, error: error.message });
        return res.status(400).json({ error: error.message });
    }

    logger.info("Posts fetched successfully", { user_id, count: data?.length || 0 });
    res.json(data);
}

const addPost = async (req: any, res: any) => {
    logger.info("Adding new post", { body: req.body });
    const { data, error } = await supabase.from('posts').insert(req.body).select().single();

    if (error) {
        logger.error("Failed to add post", { error: error.message, body: req.body });
        return res.status(400).json({ error: error.message });
    }

    logger.info("Post added successfully", { postId: data?.id });
    res.json(data);
};
const updPostById = (req: any, res: { send: (arg0: string) => any; }) => res.send("UPDATE tasks placeholder");
const removePost = (req: any, res: { send: (arg0: string) => any; }) => res.send("DELETE tasks placeholder");


export { addPost, fetchPosts, removePost, updPostById }
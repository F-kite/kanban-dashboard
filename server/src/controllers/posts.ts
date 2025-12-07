import { supabase } from "services/supabaseClient"
import type { IAddPost } from "types/posts"

const fetchPosts = async (req: any, res: any) => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
}
const addPost = async (req: any, res: any) => {
    const { data, error } = await supabase.from('posts').insert(req.body).select().single();
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};
const updPostById = (req: any, res: { send: (arg0: string) => any; }) => res.send("UPDATE tasks placeholder");
const removePost = (req: any, res: { send: (arg0: string) => any; }) => res.send("DELETE tasks placeholder");


export { addPost, fetchPosts, removePost, updPostById }
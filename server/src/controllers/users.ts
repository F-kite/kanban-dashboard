import { supabase } from "services/supabaseClient"

//получаю только одного определенного пользователя по его id
const fetchUserByID = async (req: any, res: any) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq("id", id)
        .single();

    if (error) {
        return res.status(404).json({ error: error.message });
    }

    res.json(data);
};

const addUser = async (req: any, res: any) => {
    const { username, email } = req.body;
    const { data, error } = await supabase.from('users').insert([{ username, email }]);
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
};

export { fetchUserByID, addUser }


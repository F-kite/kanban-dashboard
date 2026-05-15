import { supabase } from "services/supabaseClient"
import { logger } from "utils/logger"

//получаю только одного определенного пользователя по его id
const fetchUserByID = async (req: any, res: any) => {
    const { id } = req.params;

    if (!id) {
        logger.warn("Fetch user: User ID is required", { params: req.params });
        return res.status(400).json({ error: "User ID is required" });
    }

    logger.info("Fetching user by ID", { userId: id });
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq("id", id)
        .single();

    if (error) {
        logger.error("Failed to fetch user", { userId: id, error: error.message });
        return res.status(404).json({ error: error.message });
    }

    logger.info("User fetched successfully", { userId: id });
    res.json(data);
};

const addUser = async (req: any, res: any) => {
    const { username, email } = req.body;
    logger.info("Adding new user", { username, email });

    const { data, error } = await supabase.from('users').insert([{ username, email }]);

    if (error) {
        logger.error("Failed to add user", { error: error.message, username, email });
        return res.status(400).json({ error: error.message });
    }

    logger.info("User added successfully");
    res.json(data);
};

export { fetchUserByID, addUser }


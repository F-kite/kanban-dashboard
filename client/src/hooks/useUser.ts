import axios from "axios";
export const getUser = async (id: string) => {
    if (!id) {
        throw new Error("User ID is required");
    }
    return await axios.get(`http://localhost:5000/api/users`, {
        params: { id: id }
    });
}
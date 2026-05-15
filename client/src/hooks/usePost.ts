import axios from "axios"

export const getPosts = async (user_id: string) => {
    return await axios.get("http://localhost:5000/api/posts", {
        params: { user_id: user_id }
    })
}
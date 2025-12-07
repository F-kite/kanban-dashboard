import axios from "axios"

export const getPosts = async () => {
    return await axios.get("http://localhost:5000/api/posts")
}
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { type IAddPost } from "types/post"
import { selectUser } from "store/slices/users";
import { addPosts, selectPosts } from "store/slices/posts";

export function Home() {
    const dispatch = useDispatch()
    // Получаем данные из store
    const user = useSelector(selectUser);
    const posts = useSelector(selectPosts);

    const [newPost, setNewPost] = useState<IAddPost>({
        title: "",
        description: "",
        status: "",
        priority: "",
        position: posts.length,
        user_id: user?.id ?? ""
    })

    // Обновляем user_id когда user загрузится
    useEffect(() => {
        if (user?.id) {
            setNewPost(prev => ({ ...prev, user_id: user.id }))
        }
    }, [user])


    const AddPost = () => {
        console.log(newPost)
        dispatch(addPosts(newPost))
    }

    if (user && posts)
        return (
            <div className="w-full">
                <div className="mb-10">
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id}>
                                {post.id} : {post.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); AddPost() }} >
                        <input type="text" placeholder="title" value={newPost?.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} />
                        <input type="text" placeholder="description" value={newPost?.description} onChange={(e) => setNewPost({ ...newPost, description: e.target.value })} />
                        <select name="status" id="status" value={newPost?.status} onChange={(e) => setNewPost({ ...newPost, status: e.target.value as IAddPost['status'] })}>
                            <option value="todo">To do</option>
                            <option value="in_progress">In progress</option>
                        </select>
                        <select name="priority" id="priority" value={newPost?.priority} onChange={(e) => setNewPost({ ...newPost, priority: e.target.value as IAddPost['priority'] })}>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <button className="w-full cursor-pointer" onClick={AddPost}>Создать задачу</button>
                    </form>
                </div>
            </div>
        );
}
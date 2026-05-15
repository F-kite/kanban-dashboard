import { useSelector } from "react-redux";

import { selectUser } from "store/slices/users";
import { selectPosts } from "store/slices/posts";

/**
 * Пример компонента, который использует уже загруженные данные из Redux
 * Если данные уже есть в store, запрос не выполняется
 */
export function UserProfile() {

  // Получаем данные из store
  const user = useSelector(selectUser);
  const posts = useSelector(selectPosts);
  if (user)
    return (
      <div>
        <h2>User Profile</h2>
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
        <h3>Posts ({posts.length})</h3>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
}


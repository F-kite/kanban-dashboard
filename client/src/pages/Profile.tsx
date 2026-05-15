import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { type RootState, useStoreDispatch } from "store/store";
import { getUser, selectIsUserLoaded } from "store/slices/users";
import { getUserPosts, selectArePostsLoaded } from "store/slices/posts";

/**
 * Страница профиля пользователя
 * Использует данные из Redux store, если они уже загружены
 */
export function Profile() {
    const dispatch = useStoreDispatch();
    const { userId } = useParams<{ userId?: string }>();

    // Используем userId из URL или дефолтный
    const user_id = userId || "982c3769-9146-4654-85c6-b5bcc7ce788d";

    // Получаем данные из store
    const user = useSelector((state: RootState) => state.users.user);
    const posts = useSelector((state: RootState) => state.posts.list);

    const userLoading = useSelector((state: RootState) => state.users.loading);
    const postsLoading = useSelector((state: RootState) => state.posts.loading);

    // Проверяем, загружены ли данные для этого пользователя
    const isUserLoaded = useSelector(selectIsUserLoaded(user_id));
    const arePostsLoaded = useSelector(selectArePostsLoaded(user_id));

    useEffect(() => {
        // Загружаем данные только если они еще не загружены
        if (!isUserLoaded) {
            dispatch(getUser(user_id));
        }
        if (!arePostsLoaded) {
            dispatch(getUserPosts(user_id));
        }
    }, [dispatch, user_id, isUserLoaded, arePostsLoaded]);

    if (userLoading || postsLoading) {
        return <div className="p-4">Loading...</div>;
    }

    if (!user) {
        return <div className="p-4">User not found</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">User Profile</h1>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-2xl font-semibold mb-4">{user.username}</h2>
                <p className="text-gray-600 mb-2">
                    <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-600 mb-2">
                    <strong>ID:</strong> {user.id}
                </p>
                {user.created_at && (
                    <p className="text-gray-600">
                        <strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}
                    </p>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Posts ({posts.length})</h3>
                {posts.length > 0 ? (
                    <ul className="space-y-2">
                        {posts.map((post) => (
                            <li key={post.id} className="border-b pb-2 last:border-0">
                                <h4 className="font-medium">{post.title}</h4>
                                {post.description && (
                                    <p className="text-sm text-gray-600">{post.description}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No posts yet</p>
                )}
            </div>
        </div>
    );
}


import { logger } from "utils/logger";
import { useSelector } from "react-redux";
import { type RootState, useStoreDispatch } from "store/store"
import { useEffect } from "react";
import { getAllPosts } from "store/slices/posts";
import { getUser } from "store/slices/users";

function App() {
  const dispatch = useStoreDispatch()
  const { list, loading: postsLoading, error: postsError } = useSelector((state: RootState) => state.posts)
  const { user, loading: userLoading, error: userError } = useSelector((state: RootState) => state.users)

  const user_id: string = "982c3769-9146-4654-85c6-b5bcc7ce788d"

  useEffect(() => {
    dispatch(getUser(user_id))
    dispatch(getAllPosts());
    logger.info("App mounted successfully");
    logger.debug("Environment:", import.meta.env.MODE);
  }, [dispatch]);

  if (postsLoading || userLoading) return <div>Loading...</div>
  if (postsError || userError) {
    const error = userError || postsError
    return <div>Oops.. Error:<p>{error}</p></div>
  }
  console.log("User: ", user)
  console.log("Posts:", list)


  return (
    <ul>
      {list.map((post) => (
        <li key={post.id}>
          {post.id} : {post.title}
        </li>
      ))}
    </ul>
  );
}

export default App;

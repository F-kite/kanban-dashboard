import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { type RootState, useStoreDispatch } from "store/store"
import { getUserPosts, selectArePostsLoaded } from "store/slices/posts";
import { getUser, selectIsUserLoaded } from "store/slices/users";

import { Header } from "components/Header"
import { Profile } from "pages/Profile"
import { Home } from "pages/Home"

function App() {
  const dispatch = useStoreDispatch()
  const { loading: postsLoading, error: postsError } = useSelector((state: RootState) => state.posts)
  const { loading: userLoading, error: userError } = useSelector((state: RootState) => state.users)

  const user_id: string = "982c3769-9146-4654-85c6-b5bcc7ce788d"

  // Проверяем, загружены ли данные для этого пользователя
  const isUserLoaded = useSelector(selectIsUserLoaded(user_id))
  const arePostsLoaded = useSelector(selectArePostsLoaded(user_id))

  useEffect(() => {
    // Загружаем данные только если они еще не загружены
    if (!isUserLoaded) {
      dispatch(getUser(user_id))
    }
    if (!arePostsLoaded) {
      dispatch(getUserPosts(user_id));
    }
  }, [dispatch, user_id, isUserLoaded, arePostsLoaded]);

  if (postsLoading || userLoading) return <div>Loading...</div>
  if (postsError || userError) {
    const error = userError || postsError
    return <div>Oops.. Error:<p>{error}</p></div>
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

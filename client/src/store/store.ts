import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import posts from "./slices/posts"
import users from "./slices/users"

export const store = configureStore({
    reducer: {
        posts,
        users,
    },
    devTools: true,
})

//метод для запросов на сервер 
export const useStoreDispatch = () => useDispatch<typeof store.dispatch>()

//тип для ts, отображает структуру store
export type RootState = ReturnType<typeof store.getState>
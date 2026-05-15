import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getPosts } from "hooks/usePost"
import type { IPost } from "types/post"

interface IPostState {
    list: Array<IPost>,
    loading: boolean,
    error: string
    lastFetchedUserId: string | null
}

//Начальное состояние
const initialState: IPostState = {
    list: [],
    loading: false,
    error: "",
    lastFetchedUserId: null
}

// createAsyncThunk для ассинх. операций (API)
export const getUserPosts = createAsyncThunk(
    "posts/getUserPosts", //action type префикс
    async (user_id: string, { rejectWithValue }) => {
        try {
            const response = await getPosts(user_id)
            if (!response) throw new Error('Failed to get posts')
            return response.data
        } catch {
            return rejectWithValue("Failed to get posts")
        }
    }
)


// slice => блок состояние, который создает свой reducer и action
const counterSlice = createSlice({
    name: "posts", //используется в actions types
    initialState,
    reducers: {
        //создаем action для добавления поста
        addPosts: (state, action) => {
            const now = new Date().toISOString();
            state.list.push({
                id: Date.now().toString(), // временный ID, пока сервер не вернёт реальный
                user_id: action.payload.user_id ?? "",
                title: action.payload.title ?? "",
                description: action.payload.description ?? "",
                status: action.payload.status ?? "todo",
                priority: action.payload.priority ?? "low",
                position: action.payload.position ?? state.list.length,
                created_at: now,
                updated_at: now,
            })
        }
    },

    //обрабатывает actions из thunks
    extraReducers: (builder) => {
        builder
            // когда запрос начался (pending)
            .addCase(getUserPosts.pending, (state) => {
                state.loading = true
            })
            // когда запрос завершился успешно (fulfilled)
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.list = action.payload
                state.loading = false
                state.lastFetchedUserId = action.meta.arg
            })
            // когда запрос провалился в ошибку (rejected)
            .addCase(getUserPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

    }
})

export const { addPosts } = counterSlice.actions

// Селекторы для проверки наличия данных
// Типы будут правильно выведены при использовании с RootState
export const selectPosts = (state: { posts: IPostState }) => state.posts.list
export const selectPostsLoading = (state: { posts: IPostState }) => state.posts.loading
export const selectPostsError = (state: { posts: IPostState }) => state.posts.error
export const selectLastFetchedUserId = (state: { posts: IPostState }) => state.posts.lastFetchedUserId
export const selectArePostsLoaded = (userId: string) => (state: { posts: IPostState }) =>
    state.posts.list.length > 0 && state.posts.lastFetchedUserId === userId && !state.posts.loading

export default counterSlice.reducer
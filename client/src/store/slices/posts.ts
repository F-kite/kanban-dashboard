import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getPosts } from "hooks/usePost"
import type { IPost } from "types/post"

interface IPostState {
    list: Array<IPost>,
    loading: boolean,
    error: string
}

//Начальное состояние
const initialState: IPostState = {
    list: [],
    loading: false,
    error: ""
}

// createAsyncThunk для ассинх. операций (API)
export const getAllPosts = createAsyncThunk(
    "posts/getAllPosts", //action type префикс
    async (_, { rejectWithValue }) => {
        try {
            const response = await getPosts()
            if (!response) throw new Error('Failed to get posts')
            return response
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
            state.list.push({
                id: Date.now().toString(), // временный ID, пока сервер не вернёт реальный
                user_id: action.payload.user_id ?? 0,
                title: action.payload.title ?? "",
                description: action.payload.description ?? "",
                status: action.payload.status ?? "todo",
                priority: action.payload.priority ?? "medium",
                position: action.payload.position ?? state.list.length,
                created_at: new Date(),
                updated_at: new Date(),
            })
        }
    },

    //обрабатывает actions из thunks
    extraReducers: (builder) => {
        builder
            // когда запрос начался (pending)
            .addCase(getAllPosts.pending, (state) => {
                state.loading = true
            })
            // когда запрос завершился успешно (fulfilled)
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.list = action.payload.data
                state.loading = false
            })
            // когда запрос провалился в ошибку (rejected)
            .addCase(getAllPosts.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })

    }
})

export const { addPosts } = counterSlice.actions
export default counterSlice.reducer
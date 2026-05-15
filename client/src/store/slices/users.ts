import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUser as getUserInfo } from "hooks/useUser"
import type { IUser } from "types/user"

interface IUserState {
    user: IUser | null,
    loading: boolean,
    error: string
    lastFetchedUserId: string | null
}

const initialState: IUserState = {
    user: null,
    loading: false,
    error: "",
    lastFetchedUserId: null
}

export const getUser = createAsyncThunk(
    "users/getUser",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await getUserInfo(id)
            if (!response) {
                throw new Error(`Failed to get user`)
            }
            return response.data[0]
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to get user")
        }
    }
)

const counterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.user = ({
                id: Date.now().toString(),
                username: action.payload.username,
                email: action.payload.email,
                created_at: new Date()
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
                state.lastFetchedUserId = action.meta.arg
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { addUser } = counterSlice.actions

// Селекторы для проверки наличия данных
// Типы будут правильно выведены при использовании с RootState
export const selectUser = (state: { users: IUserState }) => state.users.user
export const selectUserLoading = (state: { users: IUserState }) => state.users.loading
export const selectUserError = (state: { users: IUserState }) => state.users.error
export const selectLastFetchedUserId = (state: { users: IUserState }) => state.users.lastFetchedUserId
export const selectIsUserLoaded = (userId: string) => (state: { users: IUserState }) =>
    state.users.user !== null && state.users.lastFetchedUserId === userId && !state.users.loading

export default counterSlice.reducer



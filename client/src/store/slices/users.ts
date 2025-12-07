import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUser as getUserInfo } from "hooks/useUser"
import type { IUser } from "types/user"

interface IUserState {
    user: IUser | null,
    loading: boolean,
    error: string
}

const initialState: IUserState = {
    user: null,
    loading: false,
    error: ""
}

export const getUser = createAsyncThunk(
    "users/getUser",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await getUserInfo(id)
            if (!response) {
                throw new Error(`Failed to get user`)
            }
            return response
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
                state.user = action.payload.data
                state.loading = false
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { addUser } = counterSlice.actions
export default counterSlice.reducer



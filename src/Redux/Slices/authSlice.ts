import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, deleteUser } from "firebase/auth";

const initialState = {
    auth: null,
    status: "idle", 
    error: null as string | null,
};


export const deleteUserAccount = createAsyncThunk(
    "auth/deleteUserAccount",
    async (_, { rejectWithValue }) => {
        try {
            const auth = getAuth();
            if (auth.currentUser) {
                await deleteUser(auth.currentUser);
                return null;
            } else {
                throw new Error("No authenticated user found.");
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.auth = action.payload;
        },
        logout: (state) => {
            state.auth = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteUserAccount.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteUserAccount.fulfilled, (state) => {
                state.auth = null;
                state.status = "succeeded";
            })
            .addCase(deleteUserAccount.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export const { login, logout } = authSlice.actions;

export const selectUser = (state: any) => state.user.user

export default authSlice.reducer;

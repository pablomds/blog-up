import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    auth: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.auth = action.payload
        },
        logout: (state) => {
            state.auth = initialState.auth;
        }
    }
});

export const { login, logout } = authSlice.actions;

export const selectUser = (state: any) => state.user.user

export default authSlice.reducer;

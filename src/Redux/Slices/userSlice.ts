import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
}

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload
    },
    logout: (state) => {
        state.user = initialState.user;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = userSlice.actions;

export const selectUser = (state: any) => state.user.user

export default userSlice.reducer;

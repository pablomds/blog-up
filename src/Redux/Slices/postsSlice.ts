import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

  const initialState: any = {
    posts: [], // Initialize posts as an empty array
    filteredPosts: [], // Initialize posts as an empty array
  };

export const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<any>) => {
      state.posts.push(action.payload);
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { setPosts, addPost, logout } = postsSlice.actions;

export const selectPosts = (state: any) => state.posts.posts

export const selectUserPosts = (state: any, action: any) =>
  _.filter(state.posts, ["createdBy", action.payload.createdBy]);

export default postsSlice.reducer;
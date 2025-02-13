import _ from "lodash";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { utils } from "@/Utils/utils";

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
    updatePost: (state, action: PayloadAction<any>) => {
      console.log(action.payload);

      const index = state.posts.findIndex(
        (post: any) => post.id === action.payload.id
      );

      if (index !== -1) {
        state.posts[index] = {
          ...state.posts[index],
          title: action.payload.title,
          text: action.payload.text,
          updatedDate: utils.getUnixTimeStamp(new Date()),
        };
      }
    },
    deletePost: (state, action: PayloadAction<any>) => {
      state.posts = state.posts.filter((post: any) => post.id !== action.payload.id);
    },
    logout: (state) => {
      state = initialState;
    },
  },
});

export const { setPosts, addPost, logout,deletePost, updatePost } = postsSlice.actions;

export const selectPosts = (state: any) => state.posts.posts

export const selectUserPosts = (state: any, id: any) => {
  return _.filter(state.posts.posts, ["createdBy", id]);
}
  

export const selectPostWithId = (state: any, id: string | undefined):any | null =>
  _.find(state.posts.posts, ["id", id]);

export default postsSlice.reducer;
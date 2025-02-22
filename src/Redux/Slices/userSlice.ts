import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateUser, deleteUser } from "@/Controllers/usersControllers";

interface IFetchDeletePostFromPostsIds  {
  postsIds: string[];
  userId: string;
};

interface IFetchUpdateUser {
  userId: string;
  name: string;
};

interface IFetchDeleteUser {
  userId: string
}

interface User {
  authProvider: string;
  createdDate: number;
  email: string;
  isActive: boolean;
  name: string;
  postsIds: string[];
  uid: string;
  updatedDate: number;
}

const initialState = {
  user: null as User | null
}

export const fetchDeletePostFromPostsIds = createAsyncThunk("user/fetchDeletePostFromPostsIds", async ({ userId, postsIds } : IFetchDeletePostFromPostsIds) => {
  
  await updateUser(userId,{ postsIds });

  return {
    postsIds
  }
});

export const fetchUpdateUser = createAsyncThunk("user/fetchUpdateUser", async ({ userId, name } : IFetchUpdateUser) => {
  
  await updateUser(userId, { name } );

  return {
    name
  }
});

export const fetchDeleteUser = createAsyncThunk("user/fetchDeleteUser", async ({ userId } : IFetchDeleteUser) => {
  
  await deleteUser(userId);

});

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeletePostFromPostsIds.fulfilled, (state, action) => {
        if (state.user) {
          state.user.postsIds = action.payload.postsIds
        }
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        if (state.user) {
          state.user.name = action.payload.name
        }
      });
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = userSlice.actions;

export const selectUser = (state: any) => state.user.user;

export const selectUserId = (state: any) => state.user.user.id;

export default userSlice.reducer;

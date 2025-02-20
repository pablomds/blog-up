import _ from "lodash";
import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { getTotalPosts, getPaginatedPosts, getPostsWithIds, deletePost, deletePostsWithListOfIds } from "@/Controllers/postsControllers";
import { utils } from "@/Utils/utils";
import { getUserByPostId } from "@/Controllers/usersControllers";


interface FetchPaginatedPostsArgs {
  page: number;
  limit: number;
  lastDoc: any | null;
}

interface IFetchUserPostsWithIds {
  author: string;
  postsIds: string[]
};

interface IFetchDeleteUserPosts {
  postsIds: string[];
};

interface IFetchDeletePost {
  postId: string;
}

  const initialState: any = {
    userPosts: [],
    posts: [],
    totalPosts: 0,
    lastDoc: null,
    currentPage: 0,
    page: 0,
    isLoading: false,
  };

export const fetchTotalPosts = createAsyncThunk("posts/fetchTotalPosts", async () => {
  const total = await getTotalPosts();
  return total;
});

export const fetchPaginatedPosts = createAsyncThunk(
  "posts/fetchPaginatedPosts",
  async ({ page, limit, lastDoc }: FetchPaginatedPostsArgs) => {
    const paginatedPosts = await getPaginatedPosts(limit, "createdDate", "desc", lastDoc);
    const posts = await Promise.all(
      _.map(paginatedPosts?.allDataFromCollection, async (post) => {
        const user = await getUserByPostId(post.id);
        return { ...post, author: user[0].name };
      })
    );
    return { 
      newPosts: [...posts], 
      lastDoc: paginatedPosts?.lastDocument, 
      page,
    };
  }
);

export const fetchUserPostsWithIds = createAsyncThunk(
  "posts/fetchPostsWithIds",
  async ({ author, postsIds }: IFetchUserPostsWithIds) => {
    const postsWithIds = await getPostsWithIds(postsIds);
    
    const posts = _.map(postsWithIds, post => {
      post.author = author
      return post
    });
    return { 
      posts
    };
  }
);

export const fetchDeletePost = createAsyncThunk(
  "posts/fetchfetchDeletePost",
  async ({ postId }: IFetchDeletePost) => {
    await deletePost(postId);
    return {
      postId
    }
  }
);

export const fetchDeleteAllUserPosts = createAsyncThunk(
  "posts/fetchDeleteAllUserPosts",
  async ({ postsIds }: IFetchDeleteUserPosts) => {
    await deletePostsWithListOfIds(postsIds)
  }
);



export const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPostsAndTotal: (state, action) => {
      state.posts = action.payload.posts;
      state.totalPosts = action.payload.totalPosts;
      state.lastDoc = action.payload.lastDoc;
      state.page = action.payload.page;
      state.currentPage = action.payload.currentPage; // ✅ Store the current page
    },
    setUserPosts: (state, action:PayloadAction<any>) => {
      state.userPosts = _.filter(state.posts, ["createdBy", action.payload.userId])
    },
    addPost: (state, action: PayloadAction<any>) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<any>) => {
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
    updateAuthorPosts: (state, action: PayloadAction<any>) => {
      state.posts = state.posts.map((post: any) => {
        if (post.createdBy === action.payload.userId) post.author = action.payload.name
        return post
      })
    },
    logout: () => {
      return { ...initialState };
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload; // ✅ Update current page in state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginatedPosts.pending, (state) => {
        state.isLoading = true; // ✅ Set loading to true
      })
      .addCase(fetchUserPostsWithIds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserPostsWithIds.fulfilled, (state, action) => {
        state.isLoading = false;
        if (!Array.isArray(state.posts)) {
          state.userPosts = [];
        }
        state.userPosts = [...state.userPosts, ...action.payload.posts];
      })
      .addCase(fetchTotalPosts.fulfilled, (state, action) => {
        state.totalPosts = action.payload;
      })
      .addCase(fetchPaginatedPosts.fulfilled, (state, action) => {
        if (!Array.isArray(state.posts)) {
          state.posts = [];
        };
        state.posts = state.posts.concat(
          action.payload.newPosts.map((post: any) => ({
            ...post,
            page: action.payload.page,
          }))
        );
        state.lastDoc = action.payload.lastDoc;
        state.currentPage = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchDeletePost.fulfilled, (state, action) => {
        if (!Array.isArray(state.posts)) {
          state.posts = [];
        };
        state.posts = state.posts.filter((post: any) => post.id !== action.payload.postId);
        state.totalPosts = state.totalPosts-1;
      })
      .addCase(fetchUserPostsWithIds.rejected, (state, action) => {
        console.error("Failed to fetch user posts with ids", action.error);
        state.isLoading = false;
      })
      .addCase(fetchTotalPosts.rejected, (state, action) => {
        console.error("Failed to fetch total posts", action.error);
        state.isLoading = false;
      })
      .addCase(fetchPaginatedPosts.rejected, (state, action) => {
        console.error("Failed to fetch posts", action.error);
        state.isLoading = false;
      });
  },
  
});

export const { setPosts, addPost, logout, setUserPosts, updateAuthorPosts, updatePost } = postsSlice.actions;

export const selectPosts = (state: any) => state.posts.posts

export const selectUserPosts = (state: any, userId: string) => {
  return {
    userPosts: state.posts.posts.filter((post: any) => post.createdBy === userId),
    isLoading: state.posts.isLoading,
  };
};

export const { setPostsAndTotal, setCurrentPage } = postsSlice.actions;

export const selectPostsAndTotal = (state: any) => {
  return {
    isLoading: state.posts.isLoading,
    posts: state.posts.posts || [],
    totalPosts: state.posts.totalPosts,
    lastDoc: state.posts.lastDoc,
    currentPage: state.posts.currentPage,
    page: state.posts.page
  };
};

export const selectPostWithId = (state: any, id: string | undefined):any | null =>
  _.find(state.posts.posts, ["id", id]);

export default postsSlice.reducer;
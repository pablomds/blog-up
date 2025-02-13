import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from "@/Redux/Slices/userSlice";
import authReducer from "@/Redux/Slices/authSlice";
import postsReducer from "@/Redux/Slices/postsSlice"
// Import other reducers if needed

const RESET_ACTION = 'RESET_ACTION';

// Persist Config
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_ACTION) {
    state = undefined; // This will reset all slices to their initial state
  }
  return combineReducers({
    user: userReducer,
    auth: authReducer,
    posts: postsReducer
  })(state, action);
};

export const resetState = () => ({
  type: RESET_ACTION,
});


// Persisted Root Reducer
export const persistedReducer = persistReducer(persistConfig, rootReducer);

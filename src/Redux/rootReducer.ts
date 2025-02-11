import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from "./Slices/userSlice";
import authReducer from "./Slices/authSlice";
// Import other reducers if needed
// import authReducer from './Slices/authSlice';

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
  })(state, action);
};

// Persisted Root Reducer
export const persistedReducer = persistReducer(persistConfig, rootReducer);

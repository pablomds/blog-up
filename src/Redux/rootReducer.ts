import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './Slices/userSlice';
// Import other reducers if needed
// import authReducer from './Slices/authSlice';

// Persist Config
const persistConfig = {
  key: 'root',
  storage,
};

// Root Reducer (combine all reducers)
const rootReducer = combineReducers({
  user: userReducer,
  // auth: authReducer, // Add more reducers here
});

// Persisted Root Reducer
export const persistedReducer = persistReducer(persistConfig, rootReducer);

import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { persistedReducer } from './rootReducer';

// Create and configure the store
const store = configureStore({
  reducer: persistedReducer,
});

// Create persistor for redux-persist
const persistor = persistStore(store);

// Export both store and persistor as named exports
export { store, persistor };

import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import { persistedReducer } from '@/Redux/rootReducer';

// Create and configure the store
const store = configureStore({
  reducer: persistedReducer,
});

// Create persistor for redux-persist
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// Export both store and persistor as named exports
export { store, persistor };

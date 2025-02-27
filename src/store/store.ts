// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import withdrawalReducer from '../features/withdrawal/withdrawalSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['currentUser', 'isLoggedIn'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Defining the store type
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    withdrawals: withdrawalReducer,
  },
});

export const persistor = persistStore(store);

// TypeScript types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

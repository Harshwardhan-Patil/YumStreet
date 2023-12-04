import { configureStore, combineReducers } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './user/slices/authSlice';
import cartReducer from './user/slices/cartSlice';
import locationReducer from './user/slices/locationSlice';
import filterReducer from './vendor/slices/filterSlice';
import vendorReducer from './vendor/slices/vendorSlice';


const combineRoot = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  location: locationReducer,
  filter: filterReducer,
  vendor: vendorReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, combineRoot);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { persistor, store };

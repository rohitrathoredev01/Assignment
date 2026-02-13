import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import appSlice from './features/appSlice';
import authSlice from './features/authSlice';
import { authService } from './services/authService';
import { productService } from './services/productService';
import productSlice from './features/productSlice';

const rootReducer = combineReducers({
  [authService.reducerPath]: authService.reducer,
  [productService.reducerPath]: productService.reducer,
  app: appSlice,
  auth: authSlice,
  product: productSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(authService.middleware, productService.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

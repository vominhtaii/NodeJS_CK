import { configureStore } from '@reduxjs/toolkit'
import productSlice from './silde/productSlide'
import userSlide from './silde/userSlide'
import OrderSlide from './silde/OrderSlide'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage';
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

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user','product']
};
const reducers = combineReducers({
  product: productSlice,
  user: userSlide,
  order: OrderSlide
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
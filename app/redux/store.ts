import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import userReducer from "./user/slice"
import { api } from "./api";
import { taskReducer } from "./tasks";
import storage from '@react-native-async-storage/async-storage';

import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

const ignoredActions = [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE];

const reducerPath = api.reducerPath;

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  task: taskReducer,
  [reducerPath]: api.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions },
    }).concat(api.middleware),
})

export const persistor = persistStore(appStore)
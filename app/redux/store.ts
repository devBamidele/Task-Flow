import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import userReducer from "./user/slice"
import taskReducer from "./tasks/slice"
import { api } from "./api";

export type RootState = ReturnType<typeof appStore.getState>;

const appStore = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    task: taskReducer,
    [api.reducerPath]: api.reducer
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware)
})

export default appStore;
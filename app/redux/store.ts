import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/data/authSlice";
import { api } from "./api";


const appStore = configureStore({
  reducer: {
    auth: authReducer,
    [api.reducerPath]: api.reducer
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware)
})

export default appStore;
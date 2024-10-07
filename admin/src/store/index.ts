import { configureStore } from "@reduxjs/toolkit";
import blogReducers from "./reducers/blogSlices";
import { useDispatch, useSelector } from "react-redux";
import authReducers from "./reducers/authSlices";
import notiReducers from "./reducers/notiSlices";
import projectReducers from "./reducers/projectSlices";

const store = configureStore({
  reducer: {
    blogReducers: blogReducers,
    authReducers: authReducers,
    notiReducers: notiReducers,
    projectReducers: projectReducers,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // Export a hook that can be reused to resolve types
export const useAppSelector = useSelector.withTypes<RootState>();

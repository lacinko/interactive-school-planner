import { configureStore } from "@reduxjs/toolkit";
import homeworkReducer from "./slices/homework";
import subjectsReducer from "./slices/subjects";
import userReducer from "./slices/users";

export const store = configureStore({
  reducer: {
    subjects: subjectsReducer,
    user: userReducer,
    homework: homeworkReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import subjectsReducer from "./slices/subjects";
import userReducer from "./slices/users";

export const store = configureStore({
  reducer: {
    subjects: subjectsReducer,
    user: userReducer,
  },
});

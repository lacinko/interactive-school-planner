import { configureStore } from "@reduxjs/toolkit";
import subjectsReducer from "./slices/subjects";

export const store = configureStore({
  reducer: {
    subjects: subjectsReducer,
  },
});

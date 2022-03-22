import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  homework: [],
};

export const homeworkSlice = createSlice({
  name: "homework",
  initialState,
  reducers: {
    addHomework: (state, action) => {
      state.homework.push(action.payload);
    },
  },
});

export const { addHomework } = homeworkSlice.actions;

export default homeworkSlice.reducer;

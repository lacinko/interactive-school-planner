import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  homework: [],
};

export const homeworkSlice = createSlice({
  name: "homework",
  initialState,
  reducers: {
    addHomework: (state, action) => {
      const { id, assignment } = action.payload.homework;
      const homeworkToAdd = state.find((homework) => homework.id === id);
      if (homeworkToAdd) {
        homeworkToAdd = { ...homeworkToAdd, assignment };
        return;
      }
      if (!homeworkToAdd) {
        state.homework.push({ id, assignment });
      }
    },
  },
});

export const { addHomework } = homeworkSlice.actions;

export default homeworkSlice.reducer;

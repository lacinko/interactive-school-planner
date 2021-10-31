import { createSlice, current } from "@reduxjs/toolkit";
import { calculateSemester } from "../../logic/apiLogic";

const initialState = {
  semester: calculateSemester(),
  subjects: [],
  message: "",
};

export const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    addSubject: (state, action) => {
      const { name, subjectType, occurrence, hour } = action.payload.subject;
      //ADD SUBJECT TO LIST
      let subjectInList = state.subjects.find(
        (subject) => subject.name === name
      );
      if (subjectInList) {
        console.log(subjectInList);
        if (subjectInList.Seminar && subjectInList.Lecture) {
          state.message = "Subject has both lecture and seminar added.";
          return;
        }

        if (subjectInList.Seminar && !subjectInList.Lecture) {
          if (subjectType === "Seminar") {
            state.message = "Subject has added seminar";
            return;
          }
          if (subjectType === "Lecture") {
            state.subjects = state.subjects.map((sub) =>
              sub.name === subjectInList.name
                ? { ...sub, [subjectType]: { occurrence, hour } }
                : sub
            );
          }
        }
        if (subjectInList.Lecture && !subjectInList.Seminar) {
          if (subjectType === "Lecture") {
            state.message = "Subject has added lecture";
            return;
          }
          if (subjectType === "Seminar") {
            state.subjects = state.subjects.map((sub) =>
              sub.name === subjectInList.name
                ? { ...sub, [subjectType]: { occurrence, hour } }
                : sub
            );
          }
        }
      }
      if (!subjectInList) {
        state.subjects.push({
          name: name,
          [subjectType]: { occurrence, hour },
        });
      }
      //ADD SUBJECT TO CALENDAR
      state.semester.map((week, idx) => {
        if (occurrence === "Every week") {
          state.semester[idx][Object.keys(week)[0]].map((day) => {
            if (
              Object.keys(day)[0].split(",")[0].toLowerCase() ===
              action.payload.subject.day.toLowerCase()
            ) {
              const hourIndex = day[Object.keys(day)].findIndex(
                (hour) => hour.time === action.payload.subject.hour
              );
              day[Object.keys(day)][hourIndex].subject = { name, subjectType };
              day[Object.keys(day)][hourIndex + 1].subject = {
                name,
                subjectType,
              };
            }
          });
        }
        if (occurrence === "Odd week") {
          if (idx % 2 !== 0 && idx > 0) return;
          state.semester[idx][Object.keys(week)[0]].map((day) => {
            if (
              Object.keys(day)[0].split(",")[0].toLowerCase() ===
              action.payload.subject.day.toLowerCase()
            ) {
              const hourIndex = day[Object.keys(day)].findIndex(
                (hour) => hour.time === action.payload.subject.hour
              );
              day[Object.keys(day)][hourIndex].subject = { name, subjectType };
              day[Object.keys(day)][hourIndex + 1].subject = {
                name,
                subjectType,
              };
            }
          });
        }
        if (occurrence === "Even week") {
          if (idx % 2 === 0) return;
          state.semester[idx][Object.keys(week)[0]].map((day) => {
            if (
              Object.keys(day)[0].split(",")[0].toLowerCase() ===
              action.payload.subject.day.toLowerCase()
            ) {
              const hourIndex = day[Object.keys(day)].findIndex(
                (hour) => hour.time === action.payload.subject.hour
              );
              day[Object.keys(day)][hourIndex].subject = { name, subjectType };
              day[Object.keys(day)][hourIndex + 1].subject = {
                name,
                subjectType,
              };
            }
          });
        }
      });
    },
  },
});

export const { addSubject } = subjectsSlice.actions;

export default subjectsSlice.reducer;

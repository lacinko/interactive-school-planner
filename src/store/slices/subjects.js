import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { calculateSemester } from "../../logic/apiLogic";
import { db } from "../../logic/firebaseConfig";

const initialState = {
  semester: null,
  subjects: [],
  message: "",
};

const loadSemester = createAsyncThunk(
  "semester/load",
  async (uid, { dispatch, rejectWithValue, getState }) => {
    const docRef = doc(db, "semester", uid);
    const docSnap = await getDoc(docRef);
    if (Object.keys(docSnap.data()).length === 0) {
      //console.log("Document data:", docSnap.data());
      await dispatch(fillSemester());
      const state = getState();
      await updateDoc(docRef, state);
      //console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
      dispatch(getSemester(docSnap.data()));
    }
  }
);

const saveSubject = createAsyncThunk(
  "subject/save",
  async (subject, { dispatch, rejectWithValue, getState }) => {
    dispatch(addSubject({ subject }));
    const uid = getState().user.user.uid;
    const state = getState().subjects;
    console.log(state);
    const docRef = doc(db, "semester", uid);
    await updateDoc(docRef, {
      semester: state.semester,
      subjects: [...state.subjects],
    });
  }
);

export const subjectsSlice = createSlice({
  name: "subjects",
  initialState,
  reducers: {
    getSemester: (state, action) => {
      state.semester = action.payload.semester;
      state.subjects = action.payload.subjects;
    },
    fillSemester: {
      reducer: (state, action) => {
        state.semester = action.payload;
      },
      prepare: () => {
        const semester = calculateSemester();
        return { payload: semester };
      },
    },
    addSubject: (state, action) => {
      const { name, subjectType, occurrence, hour, day } =
        action.payload.subject;
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
          day: day,
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
    removeSubject: (state, action) => {
      state.semester.map((week, idx) => {
        state.semester[idx][Object.keys(week)[0]].map((day) => {
          console.log(current(day));
          if (
            Object.keys(day)[0].split(",")[0].toLowerCase() ===
            action.payload.subject.day.toLowerCase()
          ) {
            const hourIndex = day[Object.keys(day)].findIndex(
              (hour) => hour.time === action.payload.subject.hour
            );
            day[Object.keys(day)][hourIndex].subject = null;
            day[Object.keys(day)][hourIndex + 1].subject = null;
          }
        });
      });
    },
  },
});
export { loadSemester, saveSubject };
export const { addSubject, removeSubject, fillSemester, getSemester } =
  subjectsSlice.actions;

export default subjectsSlice.reducer;

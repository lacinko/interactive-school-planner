import { createSlice, current, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../logic/firebaseConfig";
import { db } from "../../logic/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const initialState = {
  user: null,
  loading: false,
  message: "",
  messagingToken: "",
};

const registerUser = createAsyncThunk(
  "user/register",
  (credentials, { dispatch, rejectWithValue }) => {
    return createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((cred) => {
        setDoc(doc(db, "semester", cred.user.uid), {});
        dispatch(
          saveUser({
            refreshToken: cred._tokenResponse.refreshToken,
            email: cred.user.email,
            uid: cred.user.uid,
          })
        );
      })
      .catch((error) => rejectWithValue(error.message));
  }
);

const signInUser = createAsyncThunk(
  "user/singIn",
  (credentials, { dispatch, rejectWithValue }) => {
    return signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((res) => {
        window.location.assign("/");
        dispatch(
          saveUser({
            refreshToken: res._tokenResponse.refreshToken,
            email: res.user.email,
            uid: res.user.uid,
          })
        );
      })
      .catch((err) => rejectWithValue(err.message));
  }
);
const logoutUser = createAsyncThunk(
  "user/logout",
  (_, { dispatch, rejectWithValue }) => {
    return signOut(auth)
      .then((res) => {
        dispatch(deleteUser());
      })
      .catch((err) => rejectWithValue(err.message));
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
        refreshToken: action.payload.refreshToken,
      };
    },
    deleteUser: (state, action) => {
      state.user = null;
      state.message = " ";
    },
    saveMessagingToken: (state, action) => {
      console.log("MSG TOKEN", action.payload);
      state.messagingToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    //REGISTER USER
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = { refreshToken: action.payload };
      state.message = "User created successfully";
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.message = "Error occured, when creating user";
    });
    //SIGNIN USER
    builder.addCase(signInUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = "You have been logged in";
    });
    builder.addCase(signInUser.rejected, (state, action) => {
      state.loading = false;
      state.message = "Error occured, when loging in";
    });
  },
});

export { registerUser, signInUser, logoutUser };
export const { saveUser, deleteUser, saveMessagingToken } = userSlice.actions;

export default userSlice.reducer;

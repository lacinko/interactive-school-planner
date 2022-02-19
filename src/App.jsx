import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { Week } from "./components/Week";
import { auth } from "./logic/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { loadSemester } from "./store/slices/subjects";
import { Layout } from "./components/Layout";
import db, { getDataFromDB } from "./logic/indexedDB";
import { navigate } from "@reach/router";

function App() {
  const semester = useSelector((state) => state.subjects);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //dispatch(saveUser(user.refreshToken));
        semester.semester || dispatch(loadSemester(user.uid));
      } else {
        //dispatch(saveUser(undefined));
      }
    });
  }, [auth, dispatch]);

  useEffect(() => {
    console.log(semester);
    if (semester.semester) {
      //dispatch(saveSemester());
    }
    getDataFromDB();
  }, [semester]);

  useEffect(() => {
    if (user.user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, dispatch]);

  return (
    <Layout className="App">
      <div className="overflow-x-hidden overflow-y-scroll">
        {semester.semester &&
          semester.semester.map((wk, idx) => <Week key={idx} data={wk} />)}
      </div>
    </Layout>
  );
}

export default App;

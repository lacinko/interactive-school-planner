import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import { Week } from "./components/Week";
import { SubjectsList } from "./components/SubjectsList";
import { auth } from "./logic/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { loadSemester } from "./store/slices/subjects";
import { Layout } from "./components/Layout";
import db, { getDataFromDB } from "./logic/indexedDB";
import { navigate } from "@reach/router";

function App() {
  const semester = useSelector((state) => state.subjects);
  const msg = useSelector((state) => state.subjects.message);
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
  }, []);

  return (
    <Layout className="App">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SubjectsList />
        {msg && <h3>{msg}</h3>}
      </div>
      {semester.semester &&
        semester.semester.map((wk, idx) => <Week key={idx} data={wk} />)}
    </Layout>
  );
}

export default App;

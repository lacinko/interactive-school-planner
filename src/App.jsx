import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { Week } from "./components/Week";
import { AddSubject } from "./components/AddSubject";
import { SubjectsList } from "./components/SubjectsList";

function App() {
  const semester = useSelector((state) => state.subjects.semester);
  const msg = useSelector((state) => state.subjects.message);

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <AddSubject />
        <SubjectsList />
        {msg && <h3>{msg}</h3>}
      </div>
      {semester && semester.map((wk, idx) => <Week key={idx} data={wk} />)}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveSubject } from "../store/slices/subjects";
import "../styles/AddSubject.scss";
import { Layout } from "./Layout";

export const AddSubject = () => {
  const user = useSelector((state) => state.user);
  const [subject, setSubject] = useState({
    name: "Ekonomika Podniku",
    day: "Tuesday",
    hour: "08:45",
    length: 2,
    subjectType: "",
    occurrence: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSubject((prevObj) => ({
      ...prevObj,
      [name]: value,
    }));
  };

  const submitSubject = () => {
    dispatch(saveSubject(subject));
  };

  useEffect(() => {
    if (user.user === null) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <Layout className="addSubject">
      <input
        type="text"
        value={subject.name}
        name="name"
        placeholder="Subject name"
        onChange={handleChange}
      />
      <input
        type="text"
        value={subject.day}
        name="day"
        placeholder="Day of the week"
        onChange={handleChange}
      />
      <input
        type="text"
        value={subject.hour}
        name="hour"
        placeholder="Starting hour - HH:MM"
        onChange={handleChange}
      />
      <div className="addSubject__radio-btns">
        <label>
          {" "}
          <input
            type="radio"
            name="subjectType"
            value="Lecture"
            onChange={handleChange}
          />
          Lecture
        </label>
        <label>
          {" "}
          <input
            type="radio"
            name="subjectType"
            value="Seminar"
            onChange={handleChange}
          />
          Seminar
        </label>
      </div>
      <div className="addSubject__radio-btns">
        <label>
          {" "}
          <input
            type="radio"
            name="occurrence"
            value="Every week"
            onChange={handleChange}
          />
          Every week
        </label>
        <label>
          {" "}
          <input
            type="radio"
            name="occurrence"
            value="Odd week"
            onChange={handleChange}
          />
          Odd week
        </label>
        <label>
          {" "}
          <input
            type="radio"
            name="occurrence"
            value="Even week"
            onChange={handleChange}
          />
          Even week
        </label>
      </div>
      <button onClick={submitSubject} style={{ fontSize: ".8rem" }}>
        ADD NEW SUBJECT
      </button>
    </Layout>
  );
};

import { navigate } from "@reach/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveSubject } from "../store/slices/subjects";
import "../styles/AddSubject.scss";
import { Layout } from "./Layout";

export const AddSubject = () => {
  const user = useSelector((state) => state.user);
  const [subject, setSubject] = useState({
    name: "",
    day: "",
    hour: "",
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
      <div className="flex items-center justify-center bg-amber-100 h-screen w-screen">
        <div className="bg-white">
          <h2 className="bg-amber-300 py-2 px-6 font-bold	uppercase">
            Add a subject
          </h2>
          <div className="flex flex-col px-6 py-2">
            <input
              type="text"
              value={subject.name}
              className="py-2 border-b-[5px] border-amber-300 w-full"
              name="name"
              placeholder="Subject name"
              onChange={handleChange}
            />
            <input
              type="text"
              value={subject.day}
              className="py-2 border-b-[5px] border-amber-300 w-full"
              name="day"
              placeholder="Day of the week"
              onChange={handleChange}
            />
            <input
              type="text"
              value={subject.hour}
              className="py-2 border-b-[5px] border-amber-300 w-full"
              name="hour"
              placeholder="Starting hour - HH:MM"
              onChange={handleChange}
            />
            <div className="addSubject__radio-btns py-2">
              <label className="font-semibold px-6">
                {" "}
                <input
                  type="radio"
                  name="subjectType"
                  className=""
                  value="Lecture"
                  onChange={handleChange}
                />
                Lecture
              </label>
              <label className="font-semibold px-6">
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
            <div className="addSubject__radio-btns py-2">
              <label className="font-semibold px-2">
                {" "}
                <input
                  type="radio"
                  name="occurrence"
                  value="Odd week"
                  onChange={handleChange}
                />
                Odd week
              </label>
              <label className="font-semibold px-2">
                {" "}
                <input
                  type="radio"
                  name="occurrence"
                  value="Even week"
                  onChange={handleChange}
                />
                Even week
              </label>
              <label className="font-semibold px-2 w-screen">
                {" "}
                <input
                  type="radio"
                  name="occurrence"
                  value="Every week"
                  onChange={handleChange}
                />
                Weekly
              </label>
            </div>
            <button
              className="rounded-full bg-amber-300 px-6 py-2 my-2 mx-6"
              onClick={submitSubject}
              style={{ fontSize: ".8rem" }}
            >
              ADD NEW SUBJECT
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

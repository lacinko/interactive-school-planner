import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components/Layout";
import { addHomework } from "../store/slices/subjects";

export const Homework = () => {
  const semester = useSelector((state) => state.subjects.semester);
  const subjects = useSelector((state) => state.subjects.subjects);
  const dispatch = useDispatch();
  const subjectsNames = subjects.map((subject) => subject.name);
  const subjectsDates = [];
  const [pickedSubject, setPickedSubject] = useState(subjectsNames[0]);
  const [pickedSubjectsDate, setPickedSubjectsDates] = useState();
  const [subjectType, setSubjectType] = useState("Lecture");
  const [pickedHomework, setPickedHomework] = useState();
  useEffect(() => {
    semester && console.log(subjectsDates);
  }, [semester]);

  useEffect(() => {
    getDates();
  }, [pickedSubject]);

  useEffect(() => {
    console.log(pickedHomework);
  }, [pickedHomework]);

  function getDates() {
    semester.map((first, idx) =>
      first[`week${idx + 1}`].map((second) =>
        Object.values(second)[0].map((third, idx) => {
          if (
            third.subject?.name === pickedSubject &&
            Object.values(second)[0] &&
            idx % 2 !== 0
          ) {
            subjectsDates.indexOf(Object.keys(second)[0]) === -1 &&
              subjectsDates.push({
                date: Object.keys(second)[0],
                id: third.id,
                type: third.subject.subjectType,
              });
          }
        })
      )
    );
    setPickedSubjectsDates(subjectsDates);
    console.log(pickedSubjectsDate);
  }

  function handleChange(e) {
    if (e.target.name === "description") {
      setPickedHomework((prevVal) => ({
        ...prevVal,
        homework: e.target.value,
      }));
      return;
    }
    e.target.type === "radio" && setSubjectType(e.target.value);
  }
  function handleSelectChange(e) {
    if (e.target.name === "homework") {
      setPickedHomework(JSON.parse(e.target.value));
      return;
    }
    setPickedSubject(e.target.value);
  }

  function handleSubmit() {
    dispatch(addHomework(pickedHomework));
  }

  return (
    <Layout className="addSubject">
      <div className="flex items-center justify-center bg-amber-100 h-screen w-full">
        <div className="bg-white">
          <h2 className="bg-amber-300 py-2 px-6 font-bold	uppercase">
            Add an Homework
          </h2>
          <div className="flex flex-col px-6 py-2">
            <select
              value={pickedSubject}
              onChange={handleSelectChange}
              className="py-2 border-b-[5px] border-amber-300 w-full bg-white"
            >
              {subjectsNames.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </select>
            <div onChange={handleChange} className="py-2  w-full">
              <label className="font-semibold px-6">
                <input
                  type="radio"
                  value="Lecture"
                  name="subjectType"
                  defaultChecked
                />{" "}
                Lecture
              </label>
              <label className="font-semibold px-6">
                <input type="radio" value="Seminar" name="subjectType" />{" "}
                Seminar
              </label>
            </div>
            <select
              onChange={handleSelectChange}
              className="py-2 border-b-[5px] border-amber-300 w-full bg-white"
              name="homework"
            >
              {pickedSubjectsDate &&
                pickedSubjectsDate.map((option) => {
                  if (option.type === subjectType) {
                    return (
                      <option value={JSON.stringify(option)}>
                        {option.date}
                      </option>
                    );
                  }
                })}
            </select>

            <label className="py-2 border-b-[5px] border-amber-300 w-full flex justify-between">
              <p>Send notification in day(s):</p>
              <select onChange={handleSelectChange} className="bg-white">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
              </select>
            </label>

            <div className="addSubject__radio-btns py-2">
              <textarea
                name="description"
                placeholder="Description of homework"
                className="w-full"
                rows="10"
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              className="rounded-full bg-amber-300 px-6 py-2 my-2 mx-6"
              style={{ fontSize: ".8rem" }}
              onClick={handleSubmit}
            >
              ADD HOMEWORK
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

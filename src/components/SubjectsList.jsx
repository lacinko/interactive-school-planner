import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addMinutes } from "../logic/apiLogic";
import { removeSubject } from "../store/slices/subjects";

export const SubjectsList = () => {
  const subjects = useSelector((state) => state.subjects.subjects);
  const dispatch = useDispatch();

  return (
    <div className="subjects">
      {subjects.length > 0 ? (
        subjects.map((subject) => (
          <div>
            <strong>{subject.name}</strong>
            <p>
              {subject.Seminar &&
                `Seminar: ${subject.Seminar.occurrence} ${
                  subject.Seminar.hour
                } - ${addMinutes(subject.Seminar.hour)}`}
            </p>
            <p>
              {subject.Lecture &&
                `Lecture: ${subject.Lecture.occurrence} ${
                  subject.Lecture.hour
                } - ${addMinutes(subject.Lecture.hour)}`}
            </p>
            <button onClick={() => dispatch(removeSubject(subject))}>
              REMOVE LECTURE
            </button>
            <button onClick={() => dispatch(removeSubject(subject))}>
              REMOVE SEMINAR
            </button>
          </div>
        ))
      ) : (
        <h5>No added subjects</h5>
      )}
    </div>
  );
};

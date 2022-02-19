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
          <div className="py-2 px-6">
            <strong>{subject.name}</strong>
            {subject.Seminar && (
              <p className="py-2">
                {`Seminar: ${subject.Seminar.occurrence} ${
                  subject.Seminar.hour
                } - ${addMinutes(subject.Seminar.hour)}`}
                <button
                  className="pl-4 text-amber-500"
                  onClick={() => dispatch(removeSubject(subject))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </p>
            )}
            {subject.Lecture && (
              <p>
                {`Lecture: ${subject.Lecture.occurrence} ${
                  subject.Lecture.hour
                } - ${addMinutes(subject.Lecture.hour)}`}
                <button
                  className="pl-4 text-amber-500"
                  onClick={() => dispatch(removeSubject(subject))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </p>
            )}
          </div>
        ))
      ) : (
        <h5>No added subjects</h5>
      )}
    </div>
  );
};

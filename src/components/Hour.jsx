import React, { useEffect } from "react";

export const Hour = React.memo(({ data, nextHour }) => {
  useEffect(() => {
    console.log("RERENDER!");
  }, [data]);
  return (
    <div
      className="border-b-4 border-grey pt-2 flex items-center"
      style={
        data.subject?.subjectType === "Lecture"
          ? {
              border: "2px solid green",
            }
          : data.subject?.subjectType === "Seminar"
          ? {
              border: "2px solid blue",
            }
          : {}
      }
    >
      {nextHour ? (
        <span>
          {data.time} <br /> {nextHour.time}
        </span>
      ) : (
        data.time
      )}
      <strong className="px-4">
        {
          data.subject && data.subject.name
          /*.split(" ")
        .map((word) => <span>{word.substring(0, 1).toUpperCase()}</span>)*/
        }
      </strong>
    </div>
  );
});

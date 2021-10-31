import { useEffect } from "react";

export const Hour = ({ data, nextHour }) => {
  useEffect(() => {
    console.log("RERENDER!");
  }, [data]);
  return (
    <div
      style={
        data.subject?.subjectType === "Lecture"
          ? {
              display: "flex",
              flexDirection: "column",
              border: "2px solid green",
            }
          : data.subject?.subjectType === "Seminar"
          ? {
              display: "flex",
              flexDirection: "column",
              border: "2px solid blue",
            }
          : {
              display: "flex",
              flexDirection: "column",
            }
      }
    >
      {nextHour ? `${data.time} - ${nextHour.time}` : data.time}
      <strong>{data.subject && data.subject.name}</strong>
    </div>
  );
};

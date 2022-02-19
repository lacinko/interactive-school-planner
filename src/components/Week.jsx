import { Link, Router } from "@reach/router";
import React from "react";
import { Day } from "./Day";

export const Week = ({ data }) => {
  function getWeekDates(day, idx) {
    const url = Object.keys(day)[0].replace(/[\s,]/g, "-");
    return (
      <Link
        to={`/${url}`}
        className="px-2 mx-2 border-solid border-2 rounded font-semibold border-amber-300"
      >
        <h4>{Object.keys(day)[0].split(",")[1].split(" ")[1]}</h4>
        <h4>
          {Object.keys(day)[0].split(",")[1].split(" ")[2].substring(0, 3)}
        </h4>
      </Link>
    );
  }
  return (
    <div className="week">
      <h3
        style={{ textTransform: "uppercase" }}
        className="bg-amber-300 py-2 px-6 font-bold	uppercase w-screen"
      >
        {Object.keys(data)[0]}
      </h3>
      <div className="flex justify-center py-6">
        {data &&
          data[Object.keys(data)[0]].map((day, idx) => getWeekDates(day, idx))}
      </div>
      {data && (
        <Router>
          {data[Object.keys(data)[0]].map((day, idx) => {
            const url = Object.keys(day)[0].replace(/[\s,]/g, "-");
            return <Day data={day} path={`/${url}`} />;
          })}
        </Router>
      )}
    </div>
  );
};

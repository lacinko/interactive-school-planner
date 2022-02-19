import React from "react";
import { Hour } from "./Hour";
import "../styles/Day.scss";
import { Link } from "@reach/router";

export const Day = ({ data }) => {
  return (
    <div className="day relative">
      <Link to="/" className=" absolute top-2 right-0">
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
            d="M8 7l4-4m0 0l4 4m-4-4v18"
          />
        </svg>
      </Link>
      <h5>
        <h3 className="bg-amber-300 py-2 px-6 font-bold w-screen">
          {Object.keys(data)[0]}
        </h3>
        <div className="day__container">
          {" "}
          {data &&
            data[Object.keys(data)[0]].map(
              (hour, idx) =>
                idx < 20 && (
                  <Hour
                    data={hour}
                    nextHour={data[Object.keys(data)[0]][idx + 1]}
                  />
                )
            )}
        </div>
      </h5>
    </div>
  );
};

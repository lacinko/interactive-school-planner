import React from "react";
import { Hour } from "./Hour";
import "../styles/Day.scss";

export const Day = ({ data }) => {
  return (
    <div className="day">
      <h5>
        <h3>{Object.keys(data)[0]}</h3>
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

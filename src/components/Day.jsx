import React from "react";
import { Hour } from "./Hour";

export const Day = ({ data }) => {
  return (
    <div className="day">
      <h5>
        <h3>{Object.keys(data)[0]}</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          {" "}
          {data &&
            data[Object.keys(data)[0]].map((hour, idx) => (
              <Hour
                data={hour}
                nextHour={data[Object.keys(data)[0]][idx + 1]}
              />
            ))}
        </div>
      </h5>
    </div>
  );
};

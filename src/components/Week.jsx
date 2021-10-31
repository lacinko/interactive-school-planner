import React from "react";
import { Day } from "./Day";

export const Week = ({ data }) => {
  return (
    <div className="week">
      <h3 style={{ textTransform: "uppercase" }}>{Object.keys(data)[0]}</h3>
      {data && data[Object.keys(data)[0]].map((day) => <Day data={day} />)}
    </div>
  );
};

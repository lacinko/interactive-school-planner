import { Link } from "@reach/router";
import React from "react";

export const Menu = () => {
  return (
    <div className="menu">
      <Link to="/">School schedule</Link>
      <Link to="/login">Login</Link>
      <Link to="/add-subject">Add a subject</Link>
    </div>
  );
};

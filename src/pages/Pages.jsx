import React from "react";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { ResetPassword } from "./auth/ResetPassword";
import App from "../App";
import { Router } from "@reach/router";
import { AddSubject } from "../components/AddSubject";
import { Day } from "../components/Day";
import { Homework } from "./Homework";
import { Subjects } from "./Subjects";

export const Pages = () => {
  return (
    <Router>
      <Login exact path="/login" />
      <ResetPassword path="/password-reset" />
      <Register path="/register" />
      <AddSubject path="/add-subject" />
      <Subjects path="/subjects" />
      <Homework path="/homework" />
      <App path="/">
        <Day path=":id" />
      </App>
    </Router>
  );
};

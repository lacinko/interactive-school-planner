import React from "react";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { ResetPassword } from "./auth/ResetPassword";
import App from "../App";
import { Router } from "@reach/router";
import { AddSubject } from "../components/AddSubject";

export const Pages = () => {
  return (
    <Router>
      <Login default path="/login" />
      <ResetPassword path="/password-reset" />
      <Register path="/register" />
      <AddSubject path="/add-subject" />
      <App path="/" />
    </Router>
  );
};

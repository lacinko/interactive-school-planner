import React, { useState } from "react";
import { Link } from "@reach/router";

export const ResetPassword = () => {
  const [credentials, setCredentials] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const [name, value] = e.target;

    setCredentials((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSumbit = () => {};
  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </form>
      <Link to="/login">
        You, remember your password, suddenly? Log in now!
      </Link>
    </div>
  );
};

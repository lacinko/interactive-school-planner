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
    <div className="flex justify-center items-center min-h-screen	bg-amber-100">
      <div className="flex-col bg-white">
        <h2 className="bg-amber-300 py-2 px-6 font-bold	uppercase">
          Password Reset
        </h2>
        <form onSubmit={handleSumbit}>
          <div className="flex flex-col px-6 py-2">
            <input
              type="text"
              name="email"
              className="py-2 border-b-[5px] border-amber-300"
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-amber-300 px-6 py-2 my-2 mx-6"
          >
            Reset
          </button>
        </form>
        <div className="flex flex-col px-6 py-2">
          <p> You, remember your password, suddenly? </p>
          <Link
            to="/login"
            className="underline decoration-amber-300 decoration-2 underline-offset-4"
          >
            {" "}
            Log in now!
          </Link>
        </div>
      </div>
    </div>
  );
};

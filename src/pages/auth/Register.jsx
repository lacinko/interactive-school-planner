import React, { useState } from "react";
import { Link } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/users";

export const Register = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    "password-verify": "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (credentials.password !== credentials["password-verify"]) {
      setCredentials((prevValue) => ({
        ...prevValue,
        message: "Passwords don't match!",
      }));
      return;
    }
    dispatch(registerUser(credentials));
  };

  return (
    <div className="flex justify-center items-center min-h-screen	bg-amber-100">
      <div className="flex-col bg-white">
        <h2 className="bg-amber-300 py-2 px-6 font-bold	uppercase">Register</h2>
        {credentials.message && <h3>{credentials.message}</h3>}
        {user.message && <h3>{user.message}</h3>}
        <form onSubmit={handleSumbit}>
          <div className="flex flex-col px-6 py-2">
            <input
              type="text"
              name="email"
              className="py-2 border-b-[5px] border-amber-300"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <input
              type="password"
              name="password"
              className="py-2 border-b-[5px] border-amber-300"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <input
              type="password"
              name="password-verify"
              className="py-2 border-b-[5px] border-amber-300"
              value={credentials["password-verify"]}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={user.loading}
            className="rounded-full bg-amber-300 px-6 py-2 my-2 mx-6"
          >
            Submit
          </button>
        </form>
        <div className="flex flex-col px-6 py-2">
          <Link
            to="/login"
            className="underline decoration-amber-300 decoration-2 underline-offset-4"
          >
            Already registered? Log in now!
          </Link>
          <Link
            to="/password-reset"
            className="py-2 underline decoration-amber-300 decoration-2 underline-offset-4
            "
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
};

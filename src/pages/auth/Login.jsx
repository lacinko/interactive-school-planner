import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";
import { signInUser } from "../../store/slices/users";
import { signOut } from "firebase/auth";
import { auth } from "../../logic/firebaseConfig";
import { Layout as div } from "../../components/Layout";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    dispatch(signInUser(credentials));
    if (user.user) {
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (user.user !== null) {
      navigate("/", { replace: true });
    }
  }, [dispatch, user]);

  return (
    <div className="flex justify-center items-center min-h-screen	bg-amber-100">
      <div className="flex-col bg-white">
        <h2 className="bg-amber-300 py-2 px-6 font-bold	uppercase">Login</h2>
        {user.message && <h3>{user.message}</h3>}
        <form onSubmit={handleSumbit}>
          <div className="flex flex-col px-6 py-2">
            <input
              type="text"
              name="email"
              className="py-2 border-b-[5px] border-amber-300"
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
            <input
              type="password"
              name="password"
              className="py-2 border-b-[5px] border-amber-300"
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
            Log In
          </button>
        </form>
        <div className="flex flex-col px-6 py-2">
          <Link
            to="/register"
            className="underline decoration-amber-300 decoration-2 underline-offset-4
            "
          >
            Not registered? Register Now!
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

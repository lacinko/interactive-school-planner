import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "@reach/router";
import { useSelector, useDispatch } from "react-redux";
import { signInUser } from "../../store/slices/users";
import { signOut } from "firebase/auth";
import { auth } from "../../logic/firebaseConfig";
import { Layout } from "../../components/Layout";

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
  }, []);

  return (
    <Layout>
      <h2>Login Page</h2>
      {user.message && <h3>{user.message}</h3>}
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <button type="submit" disabled={user.loading}>
          Log In
        </button>
        <Link
          to="#"
          onClick={() => {
            signOut(auth)
              .then(() => {
                console.log("user signed out");
              })
              .catch((error) => {
                console.log("error", error);
              });
          }}
        >
          Log out
        </Link>
      </form>
      <Link to="/register">Not registered? Register Now!</Link>
      <Link to="/password-reset">Forgot your password?</Link>
    </Layout>
  );
};

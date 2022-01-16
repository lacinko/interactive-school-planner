import React, { useState } from "react";
import { Link } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/users";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../logic/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

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
    /* createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
        console.log(addDoc(collection(db, cred.user.uid)));
        addDoc(collection(db, cred.user.uid));
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error code is " + errorCode);
        console.log("Error message is " + errorMessage);
        // ..
      });*/
    dispatch(registerUser(credentials));
  };

  return (
    <div>
      <h2>Register Page</h2>
      {credentials.message && <h3>{credentials.message}</h3>}
      {user.message && <h3>{user.message}</h3>}
      <form onSubmit={handleSumbit}>
        <input
          type="text"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <input
          type="password"
          name="password-verify"
          value={credentials["password-verify"]}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <button type="submit" disabled={user.loading}>
          SUBMIT
        </button>
      </form>
      <Link to="/login">Already registered? Log in now!</Link>
      <Link to="/password-reset">Forgot your password?</Link>
    </div>
  );
};

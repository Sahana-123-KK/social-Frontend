import React, { useContext, useState } from "react";
import modeContext from "../../context/ModeContext";
import "./signup.css";
const SignUp = () => {
  const { mode } = useContext(modeContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const registerUserFnc = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      console.log(response);
      const json = await response.json();
      console.log(json);
      localStorage.setItem("socialjwt", json?.token);
      localStorage.setItem("socialuser", JSON.stringify(json?.newUser));
      alert("Account Created Successfully");
    } catch (error) {
      alert("Couldn't Create Account");
      console.log(error);
    }
  };
  return (
    <div className={mode === "light" ? "flexxrowlogin" : "flexxrowlogindark"}>
      <h1 className="loginhead">SignUp To Continue</h1>
      <form onSubmit={registerUserFnc}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            required
            onChange={handleChange}
            name="name"
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            required
            onChange={handleChange}
            name="email"
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            required
            onChange={handleChange}
            name="password"
            type="password"
            className="form-control"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;

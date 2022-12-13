import React, { useContext, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import modeContext from "../../context/ModeContext";

const Login = () => {
  const { mode } = useContext(modeContext);
  const navigate = useNavigate();
  const [logincred, setLogincred] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogincred({ ...logincred, [name]: value });
  };
  const loginFnc = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logincred),
      });
      console.log(response);
      const json = await response.json();
      alert("Loggedin Successfully");
      localStorage.setItem("socialjwt", json.token);
      localStorage.setItem("socialuser", JSON.stringify(json.user));
      navigate("/home");
      console.log(json);
    } catch (error) {
      alert("Couldn't Login");
      console.log(error);
    }
  };
  return (
    <div className={mode === "light" ? "flexxrowlogin" : "flexxrowlogindark"}>
      <h1 className="loginhead">Login To Continue</h1>
      <form onSubmit={loginFnc}>
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
        <div className="flexxrowbtns">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/register">Create an Account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

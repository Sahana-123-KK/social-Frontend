import React, { useContext, useState } from "react";
import "./navbar.css";
import ModeContext from "../../context/ModeContext";
import { Link, useNavigate } from "react-router-dom";
import Dropdownprofile from "../Dropdownprofile/Dropdownprofile";

const Navbar = () => {
  const [display, setDisplay] = useState(false);
  const changeDisplay = () => {
    setDisplay(!display);
  };
  const navigate = useNavigate();
  const { mode, changeMode } = useContext(ModeContext);
  const logoutFnc = () => {
    localStorage.removeItem("socialjwt");
    localStorage.removeItem("socialuser");
    navigate("/login");
  };
  //   changeMode(0);
  console.log(mode);

  return (
    <div className={mode === "light" ? "flexxrownav" : "flexxrownavdark"}>
      {/* <img src="" alt="" className="logo" /> */}
      <Link to="/home">
        <div className="flexxrowlogoname">
          <i class="bi bi-instagram logosize"></i>
          <h5 className="namelogo">KSgram</h5>
        </div>
      </Link>
      <div className="flexxrownavicons">
        <i
          onClick={() => {
            changeMode(1);
          }}
          class={
            mode === "light"
              ? "bi bi-brightness-high-fill dlmode highlight-sun"
              : "bi bi-brightness-high-fill dlmode"
          }
        ></i>
        <i
          onClick={() => {
            changeMode(0);
          }}
          class={
            mode === "dark"
              ? "bi bi-cloud-moon-fill dlmode dlmode highlight-moon"
              : "bi bi-cloud-moon-fill dlmode dlmode"
          }
        ></i>
        <img
          onClick={changeDisplay}
          src={JSON.parse(localStorage.getItem("socialuser"))?.profilePic}
          alt=""
          className="navuserdp"
        />
        {display && <Dropdownprofile />}
        <span>{JSON.parse(localStorage.getItem("socialuser"))?.name}</span>
        <button onClick={logoutFnc} className="logoutbtn">
          {/* <i class="bi bi-box-arrow-right"></i> */}
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

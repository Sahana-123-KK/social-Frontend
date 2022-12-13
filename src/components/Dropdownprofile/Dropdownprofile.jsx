import React, { useContext } from "react";
import "./dropdownprofile.css";
import { Link } from "react-router-dom";
import modeContext from "../../context/ModeContext";
const Dropdownprofile = () => {
  const { mode } = useContext(modeContext);
  return (
    <div
      className={mode === "light" ? "dropdownflexxcol" : "dropdownflexxcoldark"}
    >
      <Link to="/completeprofile">
        Complete Profile <i class="bi bi-pen-fill"></i>
      </Link>
      <hr />
      <Link to="/savedposts">
        Saved Posts <i class="bi bi-bookmark-fill"></i>
      </Link>
    </div>
  );
};

export default Dropdownprofile;

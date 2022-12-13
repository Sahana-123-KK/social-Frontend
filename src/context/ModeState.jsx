import React, { useState } from "react";
import ModeContext from "./ModeContext";

const ModeState = (props) => {
  let darkMode = "dark";
  //    { color: "white", backgroundColor: "grey" };
  let lightMode = "light";
  //   { color: "black", backgroundColor: "white" };
  const [mode, setMode] = useState(lightMode);
  const [savedPosts, setSavedPosts] = useState([]);

  const changeMode = (value) => {
    if (value === 0) {
      setMode(darkMode);
    } else {
      setMode(lightMode);
    }
  };

  return (
    <ModeContext.Provider
      value={{ changeMode, mode, setMode, savedPosts, setSavedPosts }}
    >
      {props.children}
    </ModeContext.Provider>
  );
};

export default ModeState;

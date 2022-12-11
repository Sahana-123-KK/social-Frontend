import React, { useContext, useEffect, useState } from "react";
import FriendDisplay from "../friendDisplay/FriendDisplay";
import { Link, useLocation } from "react-router-dom";

import "./friendlist.css";
import modeContext from "../../context/ModeContext";
const FriendList = ({ type }) => {
  const { mode } = useContext(modeContext);
  const location = useLocation();
  let path = location.pathname.split("/")[2];
  const [friends, setFriends] = useState([]);
  const getFriendsFnc = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/relation/getfriends",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("socialjwt"),
          },
        }
      );
      console.log(response);
      const json = await response.json();
      setFriends(json?.friends);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const getOthersFriends = async (req, res) => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/relation/getothersfriends",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            userId: path,
          },
        }
      );
      console.log(response);
      const json = await response.json();
      console.log(json);
      setFriends(json?.friends);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (type === "mine") {
      getFriendsFnc();
    } else {
      getOthersFriends();
    }
  }, []);
  console.log(type);
  return (
    <div
      className={
        mode === "light" ? "friendslistflexxcol" : "friendslistflexxcoldark"
      }
    >
      <h5 className="headfrlist">Friends List</h5>
      {friends.length === 0
        ? "No Friends to Display"
        : friends.map((fr, ind) => {
            return <FriendDisplay is={type} info={fr} type="friend" />;
          })}
      {/* <FriendDisplay type="friend" />
      <FriendDisplay type="friend" />
      <FriendDisplay type="friend" />
      <FriendDisplay type="friend" /> */}
    </div>
  );
};

export default FriendList;

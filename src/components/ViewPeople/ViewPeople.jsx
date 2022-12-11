import React, { useContext, useEffect, useState } from "react";
import modeContext from "../../context/ModeContext";
import FriendDisplay from "../friendDisplay/FriendDisplay";
import "./viewPeople.css";
const ViewPeople = ({ type, state }) => {
  const { mode } = useContext(modeContext);
  const [people, setPeople] = useState([]);
  const viewPeople = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/users/allprofiles",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // token: localStorage.getItem("socialjwt"),
          },
        }
      );
      console.log(response);
      const json = await response.json();
      console.log(json);
      setPeople(json?.allProfiles);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    viewPeople();
  }, []);
  return (
    <div
      className={
        (mode === "light" ? "friendslistflexxcol" : "friendslistflexxcoldark")
      }
    >
      <h5 className="headfrlist">People You May Know`</h5>
      {people.map((p, ind) => {
        return <FriendDisplay state={state} is={type} type="people" info={p} />;
      })}
      {/* <FriendDisplay type="people" />
      <FriendDisplay type="people" />
      <FriendDisplay type="people" />
      <FriendDisplay type="people" /> */}
    </div>
  );
};

export default ViewPeople;

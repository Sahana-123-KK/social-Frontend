import React, { useEffect, useState } from "react";
import FriendDisplay from "../friendDisplay/FriendDisplay";
import "./friendlist.css";
const FriendList = () => {
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
  useEffect(() => {
    getFriendsFnc();
  }, []);
  return (
    <div className="friendslistflexxcol">
      <h5 className="headfrlist">Friends List</h5>
      {friends.length === 0
        ? "No Friends to Display"
        : friends.map((fr, ind) => {
            return <FriendDisplay info={fr} type="friend" />;
          })}
      {/* <FriendDisplay type="friend" />
      <FriendDisplay type="friend" />
      <FriendDisplay type="friend" />
      <FriendDisplay type="friend" /> */}
    </div>
  );
};

export default FriendList;

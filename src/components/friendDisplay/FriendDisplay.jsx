import React from "react";
import "./friendDisplay.css";
import dp from "../../images/dp.png";
import { Link } from "react-router-dom";

const FriendDisplay = ({ type, info, is,state }) => {
  console.log(is);
  const changeRelationFnc = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/relation/change",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("socialjwt"),
          },
          body: JSON.stringify({ followedid: info?._id }),
        }
      );
      console.log(response);
      const json = await response.json();
      console.log(json);
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Couldn't Process");
    }
  };
  return (
    <div className="imgfollowflexxrowfr">
      <div className="frienduserinfoflexxrow">
        <img
          src={info?.profilePic ? info?.profilePic : dp}
          className="dpfruserimg"
          alt=""
        />
        <div className="flexxcolinfofruser">
          <Link to={`/profile/${info?._id}`}>
            <p className="frusername">{info?.name} </p>
          </Link>
          <span className="userjob">{info?.job} </span>
        </div>
      </div>
      {/* <h2>{!is && "i am here"} </h2> */}
      {(is || state === "add") &&
        (type === "friend" ? (
          <i onClick={changeRelationFnc} class="bi bi-person-fill-dash"></i>
        ) : (
          <i onClick={changeRelationFnc} class="bi bi-person-fill-add"></i>
        ))}
    </div>
  );
};

export default FriendDisplay;

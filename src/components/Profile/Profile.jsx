import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import modeContext from "../../context/ModeContext";
import FriendList from "../FriendList/FriendList";
import PostsContainer from "../Postscontainer/PostsContainer";
import ProfileCard from "../ProfileCard/ProfileCard";
import ViewPeople from "../ViewPeople/ViewPeople";
import "./profile.css";
const Profile = ({ type }) => {
  const navigate = useNavigate();
  const { mode } = useContext(modeContext);
  useEffect(() => {
    if (!localStorage.getItem("socialjwt")) {
      navigate("/login");
    }
  }, []);
  return (
    <div
      className={
        mode === "light" ? "flexxcolprofile" : "flexxcoldivprofiledark"
      }
    >
      <ProfileCard type={type} />
      <div className="flexxrowdivprofile">
        <PostsContainer type={type} />
        <div className="flexxcoldivprofile">
          <FriendList type={type} />
          <ViewPeople type={type} state="add" />
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React from "react";
import PostsContainer from "../Postscontainer/PostsContainer";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./profile.css";
const Profile = () => {
  return (
    <div className="flexxcolprofile">
      <ProfileCard />
      <div className="flexxrowdivprofile">
        <PostsContainer />
      </div>
    </div>
  );
};

export default Profile;

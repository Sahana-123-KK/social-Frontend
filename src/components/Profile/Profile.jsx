import React from "react";
import FriendList from "../FriendList/FriendList";
import PostsContainer from "../Postscontainer/PostsContainer";
import ProfileCard from "../ProfileCard/ProfileCard";
import ViewPeople from "../ViewPeople/ViewPeople";
import "./profile.css";
const Profile = ({ type }) => {
  return (
    <div className="flexxcolprofile">
      <ProfileCard type={type} />
      <div className="flexxrowdivprofile">
        <PostsContainer type={type} />
        <div className="flexxcoldivprofile">
          <FriendList />
          <ViewPeople />
        </div>
      </div>
    </div>
  );
};

export default Profile;

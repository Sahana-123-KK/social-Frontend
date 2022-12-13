import React, { useEffect } from "react";
import Profile from "../Profile/Profile";
import { useNavigate } from "react-router-dom";
import "./userProfile.css";
const UserProfile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("socialjwt")) {
      navigate("/login");
    }
  }, []);
  return <>{localStorage.getItem("socialjwt") && <Profile />};</>;
};

export default UserProfile;

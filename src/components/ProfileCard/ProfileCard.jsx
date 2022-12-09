import React, { useEffect, useState } from "react";
import "./profilecard.css";
import dp from "../../images/dp.png";
import bg from "../../images/bg.jpg";
import { Link, useLocation } from "react-router-dom";
const ProfileCard = ({ type }) => {
  const location = useLocation();
  console.log(location);
  let path = location.pathname.split("/")[2];
  console.log(path);
  const [profile, setProfile] = useState();

  const getUserProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/users/getuser/${path}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const json = await response.json();
      console.log(json);
      setProfile(json?.profile);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (type === "mine") {
      setProfile(JSON.parse(localStorage.getItem("socialuser")));
    } else {
      getUserProfile();
    }
  }, []);
  return (
    <div className="profilecardflexxcol">
      <img
        src={profile?.coverPic ? profile?.coverPic : bg}
        alt=""
        className="bgprofileimg"
      />
      <img
        className="dpprofileimg"
        src={profile?.profilePic ? profile?.profilePic : dp}
        alt=""
      />
      <h4 className="profilename">{profile?.name}</h4>
      <div className="personinfoflexxcol">
        <div className="friendsflexxrow">
          <p className="friendsno">2 friends</p>
          <i class="bi bi-person-fill-add"></i>
        </div>
        <hr />
        <div className="locationflexxrow">
          <i class="bi bi-geo-alt"></i>
          &nbsp;
          <span className="loc">{profile?.city} </span>
        </div>
        <div className="locationflexxrow">
          <i class="bi bi-briefcase"></i>
          &nbsp;
          <span className="loc">{profile?.job} </span>
        </div>
        <hr />
        <div className="editlinkflexxrow">
          <div className="locationflexxrow">
            <i class="bi bi-facebook"></i>
            &nbsp;
            <div className="flexxcolsocial">
              <a href={profile?.fbLink}>
                <p className="typesocial">Facebook</p>
              </a>

              <span className="loc">Social Network</span>
            </div>
          </div>
          <div className="editprofile">
            <i class="bi bi-pen"></i>
          </div>
        </div>
        <div className="editlinkflexxrow">
          <div className="locationflexxrow">
            <i class="bi bi-linkedin"></i>
            &nbsp;
            <div className="flexxcolsocial">
              <a href={profile?.instaLink}>
                <p className="typesocial">Linked in</p>
              </a>
              <span className="loc">Social Network</span>
            </div>
          </div>
          <div className="editprofile">
            <i class="bi bi-pen"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

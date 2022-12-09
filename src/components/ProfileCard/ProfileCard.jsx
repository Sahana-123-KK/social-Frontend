import React from "react";
import "./profilecard.css";
import dp from "../../images/dp.png";
import bg from "../../images/bg.jpg";
const ProfileCard = () => {
  return (
    <div className="profilecardflexxcol">
      <img src={bg} alt="" className="bgprofileimg" />
      <img className="dpprofileimg" src={dp} alt="" />
      <h4 className="profilename">Sahana Karthikeyani</h4>
      <div className="personinfoflexxcol">
        <div className="friendsflexxrow">
          <p className="friendsno">2 friends</p>
          <i class="bi bi-person-fill-add"></i>
        </div>
        <hr />
        <div className="locationflexxrow">
          <i class="bi bi-geo-alt"></i>
          &nbsp;
          <span className="loc">Mumbai</span>
        </div>
        <div className="locationflexxrow">
          <i class="bi bi-briefcase"></i>
          &nbsp;
          <span className="loc">Full Stack Developer</span>
        </div>
        <hr />
        <div className="editlinkflexxrow">
          <div className="locationflexxrow">
            <i class="bi bi-facebook"></i>
            &nbsp;
            <div className="flexxcolsocial">
              <p className="typesocial">Facebook</p>
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
              <p className="typesocial">Linked in</p>
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

import React, { useContext, useState } from "react";
import "./completeProfile.css";
import Filebase from "react-file-base64";
import modeContext from "../../context/ModeContext";
import { Navigate, useNavigate } from "react-router-dom";
const CompleteProfile = () => {
  const { mode } = useContext(modeContext);
  const navigate = useNavigate();
  const [completeProfile, setCompleteProfile] = useState({
    job: "",
    status: "",
    profilePic: "",
    coverPic: "",
    fbLink: "",
    instaLink: "",
    city: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompleteProfile({ ...completeProfile, [name]: value });
  };

  const completeProfileFnc = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:9000/api/users/completeprofile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("socialjwt"),
          },
          body: JSON.stringify(completeProfile),
        }
      );

      console.log(response);
      const json = await response.json();
      console.log(json);
      localStorage.setItem("socialuser", JSON.stringify(json?.complete));
      alert("Profile Completed Successfully");
      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("Couldn't Update Profile");
    }
  };
  return (
    <div className={mode === "light" ? "flexxrowlogin" : "flexxrowlogindark"}>
      <h1 className="loginhead">Complete Your Profile</h1>
      <form onSubmit={completeProfileFnc}>
        <div className="mb-3">
          <label htmlFor="fblink" className="form-label">
            Facebook Link
          </label>
          <input
            onChange={handleChange}
            required
            // onChange={handleChange}
            name="fbLink"
            type="url"
            className="form-control"
            id="fblink"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="instalink" className="form-label">
            Insta Link
          </label>
          <input
            onChange={handleChange}
            required
            // onChange={handleChange}
            name="instaLink"
            type="url"
            className="form-control"
            id="instalink"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            onChange={handleChange}
            required
            // onChange={handleChange}
            name="city"
            type="text"
            className="form-control"
            id="city"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="job" className="form-label">
            Job
          </label>
          <input
            onChange={handleChange}
            required
            // onChange={handleChange}
            name="job"
            type="text"
            className="form-control"
            id="job"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <input
            onChange={handleChange}
            required
            // onChange={handleChange}
            name="status"
            type="text"
            className="form-control"
            id="status"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profilePic" className="form-label">
            Profile Pic
          </label>
          <img
            src={completeProfile?.profilePic && completeProfile?.profilePic}
            alt=""
            className="previewPic"
          />
          <Filebase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setCompleteProfile({ ...completeProfile, profilePic: base64 });
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="coverPic" className="form-label">
            Cover Pic
          </label>
          <img
            src={completeProfile?.coverPic && completeProfile?.coverPic}
            alt=""
            className="previewPic"
          />
          <Filebase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setCompleteProfile({ ...completeProfile, coverPic: base64 });
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;

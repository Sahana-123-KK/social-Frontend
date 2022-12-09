import React, { useState } from "react";
import "./postinput.css";
import dp from "../../images/dp.png";
import Filebase from "react-file-base64";
const Postinput = () => {
  const [pic, setPic] = useState("");
  const handleChange = (e) => {
    setPic(e.target.value);
  };
  return (
    <div className="flexxcolpostinput">
      <div className="flexxrowinputtext">
        <img src={dp} alt="" className="postdp" />
        <input
          placeholder="What's in your mind"
          type="text"
          className="writepost"
        />
      </div>
      <hr />
      <div className="imgpreview">
        {pic && <img src={pic} className="previewPic" alt="" />}
      </div>
      <div className="imgpostflexxrow">
        <label htmlFor="postpic">
          <i class="bi bi-card-image"></i> &nbsp; Image
        </label>

        {/* <input onChange={handleChange} className="inputpostpic" type="file" name="pic" id="postpic" /> */}
        <Filebase
          id="postpic"
          type="file"
          multiple={false}
          onDone={({ base64 }) => {
            setPic(base64);
          }}
        />
        <button className="postbtn">Post Now</button>
      </div>
    </div>
  );
};

export default Postinput;

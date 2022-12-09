import React, { useState } from "react";
import "./postinput.css";
import dp from "../../images/dp.png";
import Filebase from "react-file-base64";
const Postinput = () => {
  const [post, setPost] = useState({
    message: "",
  });
  const handleChange = (e) => {
    setPost({ ...post, message: e.target.value });
  };

  const createPostFnc = async () => {
    setPost({ message: "" });
    try {
      const response = await fetch("http://localhost:9000/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("socialjwt"),
        },
        body: JSON.stringify(post),
      });
      console.log(response);
      const json = await response.json();
      console.log(json);
      alert("Post has been Created Successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Couldn't Post");
    }
  };
  return (
    <div className="flexxcolpostinput">
      <div className="flexxrowinputtext">
        <img
          src={JSON.parse(localStorage.getItem("socialuser"))?.profilePic}
          alt=""
          className="postdp"
        />
        <input
          value={post?.message}
          onChange={handleChange}
          placeholder="What's in your mind"
          type="text"
          className="writepost"
        />
      </div>
      <hr />
      <div className="imgpreview">
        {post?.pic && <img src={post?.pic} alt="" className="previewPic" />}
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
            setPost({ ...post, pic: base64 });
          }}
        />
        <button className="postbtn" onClick={createPostFnc}>
          Post
        </button>
      </div>
    </div>
  );
};

export default Postinput;

import React, { useContext, useState } from "react";
import "./editPost.css";
import Filebase from "react-file-base64";
import modeContext from "../../context/ModeContext";
const EditPost = ({ set, item }) => {
  const { mode } = useContext(modeContext);
  const [upPost, setUpPost] = useState({
    message: item?.message,
    pic: item?.pic,
  });
  const handleChange = (e) => {
    setUpPost({ ...upPost, message: e.target.value });
  };

  const updatePostFnc = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/posts/update/${item?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("socialjwt"),
          },
          body: JSON.stringify(upPost),
        }
      );
      console.log(response);
      const json = await response.json();
      console.log(json);
      alert("Updated Post Successfully");
      window.location.reload();
    } catch (error) {
      alert("Couldn't Update Post");
      console.log(error);
    }
  };
  return (
    <div
      className={
        mode === "light" ? "flexxcolpostinput" : "flexxcolpostinputdark"
      }
    >
      <div className="flexxrowinputtext">
        <img
          src={JSON.parse(localStorage.getItem("socialuser"))?.profilePic}
          alt=""
          className="postdp"
        />
        <input
          value={upPost?.message}
          onChange={handleChange}
          placeholder="What's in your mind"
          type="text"
          className="writepost"
        />
      </div>
      <hr />
      <div className="imgpreview">
        {upPost?.pic && <img src={upPost?.pic} alt="" className="previewPic" />}
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
            setUpPost({ ...upPost, pic: base64 });
          }}
        />
        <button className="postbtn" onClick={updatePostFnc}>
          Update
        </button>
        <button
          className="upcommbtn"
          onClick={() => {
            set();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditPost;

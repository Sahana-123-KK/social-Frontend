import React, { useState } from "react";
import "./leaveComment.css";
const LeaveComment = ({ item }) => {
  const [comment, setComment] = useState("");
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const createComment = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/comments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("socialjwt"),
          },
          body: JSON.stringify({
            postid: item?._id,
            comment,
          }),
        }
      );

      console.log(response);
      const json = await response.json();
      console.log(json);
      alert("Comment Created Successfully");
      window.location.reload();
    } catch (error) {
      alert("Couldn't Create Comment");
      console.log(error);
    }
  };
  return (
    <div className="flexxrowinputtext">
      <img
        src={JSON.parse(localStorage.getItem("socialuser"))?.profilePic}
        alt=""
        className="postdp"
      />
      <input
        value={comment}
        onChange={handleChange}
        placeholder="Leave a Comment"
        type="text"
        className="writepost"
      />
      <button
        // onClick={updateCommentCall}
        onClick={createComment}
        className="createpostcomm"
      >
        Post
      </button>
    </div>
  );
};

export default LeaveComment;

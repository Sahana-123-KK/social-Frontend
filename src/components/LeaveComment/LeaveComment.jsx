import React from "react";
import "./leaveComment.css";
const LeaveComment = () => {
  return (
    <div className="flexxrowinputtext">
      <img
        src={JSON.parse(localStorage.getItem("socialuser"))?.profilePic}
        alt=""
        className="postdp"
      />
      <input
        // value={post?.message}
        // onChange={handleChange}
        placeholder="Leave a Comment"
        type="text"
        className="writepost"
      />
    </div>
  );
};

export default LeaveComment;

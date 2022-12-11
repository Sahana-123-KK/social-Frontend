import React, { useState } from "react";
import dp from "../../images/dp.png";
import UpdateComment from "../UpdateComment/UpdateComment";
import moment from "moment";
import "./commentComponent.css";
const CommentComponent = ({ item }) => {
  const [show, setShow] = useState(false);

  const updateComment = () => {
    setShow(!show);
  };
  const deleteComment = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/comments/delete/${item?._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            postid: item?.postid,
            token: localStorage.getItem("socialjwt"),
          },
        }
      );
      console.log(response);
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="commentcompflexxcol">
      <div className="flexxcommentuserrow">
        <img src={item?.profilePic} alt="" className="commuserdp" />
        <p className="commetername">{item?.name} </p>
      </div>
      {!show && <div className="commentermess">{item?.comment} </div>}
      {show && <UpdateComment item={item} setShow={setShow} />}
      <div className="ownercommentflexxrow">
        {
          // !show &&
          <span className="commentedat">
            {" "}
            {moment(item?.commentAt).fromNow()}{" "}
          </span>
        }
        {item?.userid ===
          JSON.parse(localStorage.getItem("socialuser"))._id && (
          <div className="delupcommflexxrow">
            <i onClick={updateComment} class="bi bi-pen"></i>
            <i onClick={deleteComment} class="bi bi-trash"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentComponent;

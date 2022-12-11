import React, { useState } from "react";
import "./updateComment.css";
const UpdateComment = ({ setShow, item }) => {
  const [comment, setComment] = useState(item?.comment);
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const updateCommentCall = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/comments/update/${item?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("socialjwt"),
            postid: item?.postid,
            //   postid:
          },
          body: JSON.stringify({ comment }),
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
    <div className="updateflexxrowcomm">
      <div class="mb-1">
        <label for="comment" class="form-label">
          Comment
        </label>
        <input
          onChange={handleChange}
          value={comment}
          placeholder="What you think?"
          type="text"
          class="form-control"
          id="comment"
          aria-describedby="emailHelp"
        />
      </div>
      <button onClick={updateCommentCall} className="upcommbtn">
        Update
      </button>
      <button
        onClick={() => {
          setShow();
        }}
        className="upcommbtn"
      >
        Cancel
      </button>
    </div>
  );
};

export default UpdateComment;

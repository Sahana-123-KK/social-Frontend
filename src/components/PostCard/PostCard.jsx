import React from "react";
import "./postcard.css";
import dp from "../../images/dp.png";

const PostCard = ({ item }) => {
  console.log(item);
  const changeRelationFnc = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/relation/change",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("socialjwt"),
          },
          body: JSON.stringify({ followedid: item?.userid }),
        }
      );
      console.log(response);
      const json = await response.json();
      console.log(json);
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Couldn't Process");
    }
  };

  const likePostFnc = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/posts/likepost/${item?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("socialjwt"),
          },
        }
      );
      console.log(response);
      const json = await response.json();
      console.log(json);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(item);
  return (
    <div className="postcardflexxcol">
      <div className="imgfollowflexxrow">
        <div className="postuserinfoflexxrow">
          <img
            src={item?.profilePic ? item?.profilePic : dp}
            className="dppostuserimg"
            alt=""
          />
          <div className="flexxcolinfopostuser">
            <p className="postusername">{item?.name}</p>
            <span className="citypostuser">{item?.city} </span>
          </div>
        </div>
        <i onClick={changeRelationFnc} class="bi bi-person-fill-dash"></i>
      </div>
      <p className="postmessage">{item?.message} </p>
      <img src={item?.pic} alt="" className="postimg" />
      <div className="flexxrowinteracitonpost">
        <i onClick={likePostFnc} class={`bi bi-heart interactposticon`}></i>
        {item?.likeCount} Likes
        <i class="bi bi-chat interactposticon "></i>
      </div>
    </div>
  );
};

export default PostCard;

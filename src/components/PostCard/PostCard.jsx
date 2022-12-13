import React, { useContext, useEffect, useState } from "react";
import "./postcard.css";
import dp from "../../images/dp.png";
import LeaveComment from "../LeaveComment/LeaveComment";
import CommentComponent from "../CommentComponent/CommentComponent";
import EditPost from "../EditPost/EditPost";
import modeContext from "../../context/ModeContext";

const PostCard = ({ item, hide }) => {
  // const [savedPosts, setSavedPosts] = useState([]);
  const { mode, savedPosts, setSavedPosts } = useContext(modeContext);
  const [comments, setComments] = useState([]);
  const [editPost, setEditPost] = useState(false);
  // console.log(item);
  const see = () => {
    setEditPost(!editPost);
  };
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
      setComments(json?.comments);
      console.log(json);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const deletePostFnc = async () => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/posts/delete/${item?._id}`,
        {
          method: "DELETE",
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
      alert("Your Post has Been Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Couldn't Delete Post");
    }
  };
  const [showComm, setShowComm] = useState(false);
  const changeShow = () => {
    setShowComm(!showComm);
  };

  const getComments = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/comments/getcomments",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            postid: item?._id,
          },
        }
      );
      console.log(response);
      const json = await response.json();
      setComments(json?.comments);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };
  const [booked, setBooked] = useState([]);
  useEffect(() => {
    setBooked(() => {
      return savedPosts?.filter((post, ind) => {
        return post?.postid === item?._id;
      });
    });
  }, [savedPosts]);

  console.log(booked);

  useEffect(() => {
    getComments();
  }, []);

  const savePost = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/posts/saveposts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("socialjwt"),
            postid: item?._id,
          },
        }
      );
      console.log(response);
      const json = await response.json();
      console.log(json);
      setSavedPosts(json?.posts?.postsSaved);
      alert("Post Saved Successfully");
    } catch (error) {
      alert("Couldn't Save");
      console.log(error);
    }
  };
  // console.log(item);
  const getmySavedPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/posts/getsavedposts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("socialjwt"),
          },
        }
      );
      console.log(response);
      const json = await response.json();
      console.log(json);
      if (json?.posts === null) {
        setSavedPosts([]);
      } else {
        setSavedPosts(json?.posts?.postsSaved);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getmySavedPosts();
  }, []);
  return (
    <div
      className={mode === "light" ? "postcardflexxcol" : "postcardflexxcoldark"}
    >
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

      {editPost ? (
        <EditPost set={setEditPost} item={item} />
      ) : (
        <>
          <p className="postmessage">{item?.message} </p>
          <img src={item?.pic} alt="" className="postimg" />
          <div className="flexxrowinteracitonpost">
            <div className="flexxrowviewerint">
              <div className="flexxcollikes">
                <i
                  onClick={likePostFnc}
                  class={`bi bi-heart interactposticon`}
                ></i>
                {item?.likeCount}
              </div>
              {/* <i class="bi bi-chat interactposticon "></i> */}
            </div>
            {/* <i onClick={savePost} class="bi bi-bookmark"></i> */}

            <div className="ownerpostintflexxrow">
              {booked?.length === 0 ? (
                <i onClick={savePost} class="bi bi-bookmark"></i>
              ) : (
                <i onClick={savePost} class="bi bi-bookmark-fill"></i>
              )}

              {
                // hide === "show" &&
                item?.userid ===
                  JSON.parse(localStorage.getItem("socialuser"))._id && (
                  <>
                    <i onClick={deletePostFnc} class="bi bi-trash"></i>
                    <i onClick={see} class="bi bi-pen"></i>
                  </>
                )
              }
            </div>
          </div>

          <LeaveComment item={item} />
          <div onClick={changeShow} className="headcomm">
            <p>Comments</p>
            {!showComm ? (
              <i class="bi bi-caret-down-fill"></i>
            ) : (
              <i class="bi bi-caret-up-fill"></i>
            )}
          </div>

          {showComm && (
            <div className="showcommends">
              {comments.length === 0
                ? "No Comments To Display"
                : comments.map((item, ind) => {
                    return <CommentComponent item={item} />;
                  })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostCard;

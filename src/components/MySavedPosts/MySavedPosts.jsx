import React, { useEffect, useState, useContext } from "react";
import modeContext from "../../context/ModeContext";
import PostCard from "../PostCard/PostCard";
import "./mysavedposts.css";
const MySavedPosts = () => {
  const { savedPosts, mode } = useContext(modeContext);
  const [fullSavedPosts, setFullSavedPosts] = useState([]);
  const savedPostsFull = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/posts/getfullsavedposts",
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
      setFullSavedPosts(json?.posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    savedPostsFull();
  }, [savedPosts]);
  return (
    <div
      className={
        mode === "light" ? "flexxcolsavedposts" : "flexxcolsavedpostsdark"
      }
    >
      <h4 className="savedpostshead">My Saved Posts</h4>
      <div className="flexxcolpostssaved">
        {fullSavedPosts.length === 0
          ? "No Saved Posts To Display"
          : fullSavedPosts.map((post, ind) => {
              return <PostCard hide={"hide"} item={post} />;
            })}
      </div>
    </div>
  );
};

export default MySavedPosts;

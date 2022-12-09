import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import Postinput from "../Postinput/Postinput";
import "./postscontainer.css";
const PostsContainer = ({ type }) => {
  const [posts, setPosts] = useState([]);
  const getFriendsPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/posts/userposts",
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
      setPosts(json?.posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFriendsPosts();
  }, []);
  return (
    <div className="postscontainflexxcol">
      {type === "mine" && <Postinput />}

      {posts.map((post, ind) => {
        console.log(post);
        return (
          <>
            {post.length !== 0 && (
              <h5 className="friendname"> {post[0]?.name}'s Posts </h5>
            )}
            {post.map((item, i) => {
              // console.log(item);
              return <PostCard item={item} />;
            })}
          </>
        );
      })}
    </div>
  );
};

export default PostsContainer;

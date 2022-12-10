import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import { Link, useLocation } from "react-router-dom";

import Postinput from "../Postinput/Postinput";
import "./postscontainer.css";
const PostsContainer = ({ type }) => {
  const location = useLocation();
  // console.log(location);
  let path = location.pathname.split("/")[2];
  console.log(path);
  const [posts, setPosts] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);
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
  const getOthersPost = async () => {
    try {
      const response = await fetch(
        "http://localhost:9000/api/posts/getotherspost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: path,
          }),
        }
      );
      console.log(response);
      const json = await response.json();
      console.log(json?.posts);
      // setPosts(json?.posts);
      setOtherPosts(json?.posts);
      // setPosts(json?.posts);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (type === "mine") {
      getFriendsPosts();
    } else {
      getOthersPost();
    }
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
      {
        type !== "mine" && otherPosts.length === 0 ? (
          "No Posts To Display"
        ) : (
          <>
            <h5 className="username">{otherPosts[0]?.name}'s Posts</h5>
            {otherPosts.map((item) => {
              return (
                <>
                  <PostCard item={item} />
                </>
              );
            })}
          </>
        )
        // console.log();
      }
      {/* {otherPosts.map((post, ind) => {
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
      })} */}
    </div>
  );
};

export default PostsContainer;

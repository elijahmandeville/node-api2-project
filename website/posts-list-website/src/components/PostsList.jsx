import React from "react";
import Post from "./Post";

function PostsList(props) {
  console.log("POST LIST", props);
  return (
    <div>
      <h3 class="ui dividing header">Comments</h3>
      {props.posts.map((item, index) => {
        return <Post post={item} key={index} />;
      })}
    </div>
  );
}

export default PostsList;

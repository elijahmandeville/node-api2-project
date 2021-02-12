import React from "react";
import faker from "faker";

function Post(props) {
  return (
    <div class="ui comments">
      <div class="comment">
        <div class="avatar">
          <img src={faker.image.avatar()} />
        </div>
        <div class="content">
          <a class="author">{faker.name.firstName()}</a>
          <div class="metadata">
            <div>Today at 5:42PM</div>
          </div>
          <div class="text">{props.post.title}</div>
          <div class="actions">
            <a class="">Reply</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;

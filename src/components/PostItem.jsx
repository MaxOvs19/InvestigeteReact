import React, { useState } from 'react';

const PostItem = (props) => {
  console.log(props);
  return (
    <div>
      <div className="post">
        <div className="post__block">
          <strong>
            {props.post.id} {props.post.title}
          </strong>
          <div>{props.post.body}</div>
        </div>

        <div className="post__btn">
          <button>Delite</button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

import React, { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostForm = ({ create }) => {
  const [post, setPosts] = useState({ title: '', body: '' });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    setPosts({ title: '', body: '' });
  };

  return (
    <form>
      <MyInput
        onChange={(e) => setPosts({ ...post, title: e.target.value })}
        value={post.title}
        type="text"
        placeholder="Название поста"
      />
      <MyInput
        onChange={(e) => setPosts({ ...post, body: e.target.value })}
        value={post.body}
        type="text"
        placeholder="Описание"
      />
      <MyButton onClick={addNewPost} text="Create">
        Добавить пост
      </MyButton>
    </form>
  );
};

export default PostForm;

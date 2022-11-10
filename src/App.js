import React, { useState } from 'react';
import '../src/styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';

function App() {
  const [posts, setPost] = useState([
    { id: 1, title: 'JS', body: 'Description' },
    { id: 2, title: 'TS', body: 'Description' },
    { id: 3, title: 'C', body: 'Description' },
    { id: 4, title: 'C++', body: 'Description' },
  ]);

  const [selectedSort, setSelectedSort] = useState('');

  const createPost = (newPost) => {
    setPost([...posts, newPost]);
  };

  const removePost = (post) => {
    setPost(posts.filter((p) => p.id !== post.id));
  };

  const sortPost = (sort) => {
    console.log(sort);
    setSelectedSort(sort);
    setPost([...posts].sort((a, b) => a[sort].localeCopmare(b[sort])));
  };

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px' }} />
      <div>
        <MySelect
          defaultValue="Сортировка по"
          value={selectedSort}
          onChange={sortPost}
          options={[
            {
              value: 'title',
              name: 'По названию',
            },
            {
              value: 'Body',
              name: 'По описанию',
            },
          ]}
        />
      </div>
      {posts.length ? (
        <PostList remove={removePost} posts={posts} />
      ) : (
        <h1 style={{ textAlign: 'center' }}>Посты не найдены</h1>
      )}
    </div>
  );
}

export default App;

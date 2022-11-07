import React, { useState } from 'react';
import '../src/styles/App.css';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';

function App() {
  const [posts, setpost] = useState([
    { id: 1, title: 'JS', body: 'Description' },
    { id: 2, title: 'TS', body: 'Description' },
    { id: 3, title: 'C', body: 'Description' },
    { id: 4, title: 'C++', body: 'Description' },
  ]);

  return (
    <div className="App">
      <form>
        <input type="text" placeholder="Название поста" />
        <input type="text" placeholder="Описание" />
        <MyButton text="Create" />
      </form>
      <PostList posts={posts} title="Список постов" />
    </div>
  );
}

export default App;

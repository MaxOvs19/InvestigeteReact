import React, { useState, useEffect } from 'react';
import '../src/styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';

function App() {
  const [posts, setPost] = useState([]);

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedSearchPost = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPost([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPost(posts.filter((p) => p.id !== post.id));
  };

  async function fetchPost() {
    const post = await PostService.getAll();
    setPost(post);
  }

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="App">
      <button onClick={fetchPost}>Get Posts</button>
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: '15px' }} />
      <PostFilter filter={filter} setFilter={setFilter} />

      <PostList remove={removePost} posts={sortedSearchPost} />
    </div>
  );
}

export default App;

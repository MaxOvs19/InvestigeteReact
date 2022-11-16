import React, { useMemo, useState } from 'react';
import '../src/styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';

function App() {
  const [posts, setPost] = useState([
    { id: 1, title: 'JS', body: 'dadwa' },
    { id: 2, title: 'TS', body: 'Dessdacription' },
    { id: 3, title: 'C', body: 'iptiwaqon' },
    { id: 4, title: 'C++', body: 'Descridqweption' },
  ]);

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);

  const sortedPost = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }
    return posts;
  }, [filter.sort, posts]);

  const sortedSearchPost = useMemo(() => {
    return sortedPost.filter((post) =>
      post.title.toLowerCase().includes(filter.query.toLowerCase()),
    );
  }, [filter.query, sortedPost]);

  const createPost = (newPost) => {
    setPost([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPost(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
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

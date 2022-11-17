import React, { useState, useEffect } from 'react';
import '../src/styles/App.css';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/modal/MyModal';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import PostService from './API/PostService';
import Loader from './components/UI/loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount } from './components/utils/pages';

function App() {
  const [posts, setPost] = useState([]);

  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [fetchPost, isPostsLoading, postError] = useFetching(async () => {
    const responce = await PostService.getAll(limit, page);
    setPost(responce.data);
    const totalCount = responce.headers['x-total-count'];
    setTotalPage(getPageCount(totalCount, limit));
  });
  const sortedSearchPost = usePosts(posts, filter.sort, filter.query);

  const createPost = (newPost) => {
    setPost([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPost(posts.filter((p) => p.id !== post.id));
  };

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

      {postError && <h1>Error! ${postError}</h1>}
      {isPostsLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <Loader />{' '}
        </div>
      ) : (
        <PostList remove={removePost} posts={sortedSearchPost} />
      )}
    </div>
  );
}

export default App;

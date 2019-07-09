import React from 'react';
import PostsList from './components/PostsList';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:4000/api/posts/')
      setPosts(response.data);
    }

    fetchPosts();
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <h1>Posts</h1>
      </header>
      <PostsList posts={posts} />

    </div>
  );
}

export default App;

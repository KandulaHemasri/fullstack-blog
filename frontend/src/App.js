import { useState, useEffect,useCallback } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

   const fetchPosts = useCallback(async () => {
    const res = await fetch("http://localhost:5000/api/posts");
    const data = await res.json();
    setPosts(data);
  }, []); 

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div>
      <h1>My Blog</h1>

      <PostForm fetchPosts={fetchPosts} />
      <PostList posts={posts} fetchPosts={fetchPosts} />
    </div>
  );
}

export default App;
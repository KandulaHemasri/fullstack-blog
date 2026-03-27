import { useState, useEffect } from "react";

function PostList({ posts, fetchPosts }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load posts on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchPosts();
        setError("");
      } catch (err) {
        console.error(err);
        setError("Backend is not running ");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchPosts]);

  // Delete post
  const deletePost = async (id) => {
    try {
      const res = await fetch(`https://fullstack-blog-0jou.onrender.com/api/posts/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      // Refresh posts after delete
      fetchPosts();
    } catch (err) {
      console.error(err);
      setError("Delete failed");
    }
  };

  // UI States
  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h2>All Posts</h2>

      {posts.length === 0 ? (
        <p className="message">No posts available</p>
      ) : (
        posts.map((post) => (
          <div className="post"
            key={post._id}
          >
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            {/*  Show image if exists */}
            {post.image && (
              <img
                src={post.image}
                alt="post"
              />
            )}

            <br />


            <button className="delete-btn"
              onClick={() => deletePost(post._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;
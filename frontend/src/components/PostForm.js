import { useState } from "react";

function PostForm({ fetchPosts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);

      const res = await fetch("https://fullstack-blog-0jou.onrender.com/api/posts", {
        method: "POST",
        body: formData, 
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Post creation failed");
      }

      // Reset form
      setTitle("");
      setContent("");
      setImage(null);

      fetchPosts(); // refresh posts

    } catch (error) {
      console.error(error);
      alert("Error creating post ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} >
      <h2>Create Post</h2>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button className="btn" type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Add Post"}
      </button>
    </form>
  );
}

export default PostForm;





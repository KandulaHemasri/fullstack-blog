// import express from "express";
// import Post from "../models/Post.js";

// const router = express.Router();

// // GET all posts
// router.get("/", async (req, res) => {
//   const posts = await Post.find();
//   res.json(posts);
// });

// // CREATE post
// router.post("/", async (req, res) => {
//   const post = new Post(req.body);
//   const saved = await post.save();
//   res.json(saved);
// });

// export default router;






// import express from "express";
// import Post from "../models/Post.js";

// const router = express.Router();

// // GET all posts
// router.get("/", async (req, res) => {
//   const posts = await Post.find();
//   res.json(posts);
// });

// // CREATE post
// router.post("/", async (req, res) => {
//   const post = new Post(req.body);
//   const saved = await post.save();
//   res.json(saved);
// });

// // DELETE post
// router.delete("/:id", async (req, res) => {
//   try {
//     await Post.findByIdAndDelete(req.params.id);
//     res.json({ message: "Post deleted" });
//   } catch (error) {
//     res.status(500).json({ error: "Delete failed" });
//   }
// });

// export default router;






import express from "express";
import Post from "../models/Post.js";
import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const router = express.Router();


//GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});


//CREATE post with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    let imageUrl = "";

    // Upload image to Cloudinary
    if (req.file) {
      console.log("Uploading to Cloudinary...");

      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "blog_posts" },
            (error, result) => {
              if (result) {
                console.log("Cloudinary upload success:", result.secure_url);
                resolve(result);
              } else {
                console.log("Cloudinary upload error:", error);
                reject(error);
              }
            }
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();
      imageUrl = result.secure_url;
    }

    //Save post in MongoDB
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      image: imageUrl,
    });

    const saved = await post.save();

    console.log("Post saved:", saved);

    res.status(201).json(saved);

  } catch (error) {
    console.error("ERROR:", error); //THIS WILL SHOW REAL ISSUE
    res.status(500).json({ error: "Post creation failed" });
  }
});


//DELETE post
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Delete failed" });
  }
});


export default router;
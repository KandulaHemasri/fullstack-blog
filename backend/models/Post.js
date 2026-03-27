import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
}, { timestamps: true });

export default mongoose.model("Article", postSchema);
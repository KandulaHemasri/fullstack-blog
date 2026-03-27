import dotenv from "dotenv";
dotenv.config();
import express from "express";

import cors from "cors";
import connectDB from "./config/db.js";
import postRoutes from "./routes/postRoutes.js";


connectDB();

const app = express();

app.use(cors()); 
app.use(express.json());

console.log(process.env.CLOUDINARY_API_KEY);

// Routes
app.use("/api/posts", postRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
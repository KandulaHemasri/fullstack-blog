# 📝 Fullstack Blog App (MERN)

A modern **Fullstack Blog Application** built using the **MERN Stack (MongoDB, Express, React, Node.js)**.
This project demonstrates complete CRUD functionality along with image uploads using cloud storage.

---
## Live link - https://fullstack-blog-ten.vercel.app/

## 🚀 Features

* ✍️ Create blog posts with title, content, and image
* 📖 View all posts in a clean UI
* 🗑️ Delete posts instantly
* 🖼️ Upload images using Cloudinary
* ⚡ Real-time UI updates
* 🔄 Full CRUD operations
* 🌐 RESTful API integration

---

## 🛠️ Tech Stack

### Frontend

* React.js
* CSS (Custom Styling)
* Fetch API

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)

### Cloud & Tools

* Cloudinary (Image Uploads)
* Multer (File Handling)
* dotenv (Environment Variables)



---

## ⚙️ Setup Instructions

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create a `.env` file in backend:

```
MONGO_URI=your_mongodb_connection
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run backend:

```
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm start
```

---

## 🌐 API Endpoints

| Method | Endpoint         | Description     |
| ------ | ---------------- | --------------- |
| GET    | `/api/posts`     | Get all posts   |
| POST   | `/api/posts`     | Create new post |
| DELETE | `/api/posts/:id` | Delete post     |

---




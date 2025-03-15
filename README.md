# **DevConnector** 💻🔗

## **A Social Media API for Developers** 🌍✨

DevConnector is a **Node.js** and **Express** backend for a social media platform where developers can **connect, post, like, and comment** on each other's updates. The API includes **JWT-based authentication, profile management, post interactions, and validation using Express Validator**.

---

## **✨ Features**

✅ User Authentication & Authorization (JWT) 🔐  
✅ Create, Update, and Delete Profiles 👨‍💻  
✅ CRUD Operations on Posts 📝  
✅ Like & Unlike Posts 👍👎  
✅ Comment on Posts 💬  
✅ Validation & Error Handling ⚠️  
✅ Secure API Routes with Middleware 🛡️

---

## **📂 Project Structure**

```
📂 devconnector
 ┣ 📂 config
 ┃ ┗ 📄 env.config.js
 ┣ 📂 controllers
 ┃ ┣ 📄 auth.controller.js
 ┃ ┣ 📄 profile.controller.js
 ┃ ┗ 📄 post.controller.js
 ┣ 📂 middlewares
 ┃ ┣ 📄 checkAuth.middleware.js
 ┃ ┗ 📄 asyncErrorHandler.js
 ┣ 📂 models
 ┃ ┣ 📄 user.model.js
 ┃ ┣ 📄 profile.model.js
 ┃ ┗ 📄 post.model.js
 ┣ 📂 routes
 ┃ ┣ 📄 auth.routes.js
 ┃ ┣ 📄 profile.routes.js
 ┃ ┗ 📄 post.routes.js
 ┣ 📂 validators
 ┃ ┗ 📄 post.validator.js
 ┣ 📄 server.js
 ┗ 📄 README.md
```

---

## **🛠️ Installation & Setup**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/your-username/devconnector.git
cd devconnector
```

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a **.env** file in the root directory and add:

```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### **4️⃣ Start the Server**

```sh
npm run dev
```

The server will start on **http://localhost:5000** 🚀

---

## **🔗 API Routes**

### 🔒 **Authentication**

| Method | Route            | Description     | Access |
| ------ | ---------------- | --------------- | ------ |
| POST   | `/auth/register` | Register a user | Public |
| POST   | `/auth/login`    | Login & get JWT | Public |

### 👤 **User Profiles**

| Method | Route      | Description                | Access  |
| ------ | ---------- | -------------------------- | ------- |
| GET    | `/user/me` | Get logged-in user profile | Private |
| PUT    | `/user/me` | Update user profile        | Private |

### 📝 **Posts**

| Method | Route       | Description      | Access  |
| ------ | ----------- | ---------------- | ------- |
| POST   | `/post`     | Create a post 🔀 | Private |
| GET    | `/post`     | Get all posts 📜 | Public  |
| PUT    | `/post/:id` | Update a post ✏️ | Private |
| DELETE | `/post/:id` | Delete a post ❌ | Private |

### 👍 **Post Likes**

| Method | Route            | Description             | Access  |
| ------ | ---------------- | ----------------------- | ------- |
| PUT    | `/post/:id/like` | Like/Unlike a post 👍👎 | Private |

### 💬 **Post Comments**

| Method | Route                          | Description         | Access  |
| ------ | ------------------------------ | ------------------- | ------- |
| POST   | `/post/:id/comment`            | Add a comment 💬    | Private |
| DELETE | `/post/:id/comment/:commentId` | Delete a comment ❌ | Private |

---

## **🛡️ Middleware**

-   **`checkAuth`** → Protects private routes by verifying JWT.
-   **`postValidator`** → Ensures valid post data before saving.
-   **`asyncErrorHandler`** → Catches async errors to avoid crashes.

---

## **📋 Example API Request**

### **🔒 Register User**

```sh
curl -X POST http://localhost:5000/auth/register \
-H "Content-Type: application/json" \
-d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}'
```

### **📝 Create a Post**

```sh
curl -X POST http://localhost:5000/post \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{
    "text": "This is my first post!",
    "name": "John Doe",
    "avatar": "https://example.com/avatar.jpg"
}'
```

### **👍 Like a Post**

```sh
curl -X PUT http://localhost:5000/post/POST_ID/like \
-H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### **💬 Add a Comment**

```sh
curl -X POST http://localhost:5000/post/POST_ID/comment \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{
    "text": "This is my comment!"
}'
```

---

## **📜 License**

This project is licensed under the **MIT License**.

---

## **🚀 Contributing**

Want to improve DevConnector? Feel free to submit a **pull request** or report **issues**! 🎯

---

**Made with ❤️ by [Abhisek](https://github.com/abhisekadhikari)!**

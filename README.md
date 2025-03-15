# DevConnector 🚀

A **social platform** for developers to connect, share experiences, and collaborate on projects. Built with **Node.js, Express, MongoDB, and JWT authentication**. 🛠️

## Features ✨

-   👤 **User Authentication** (Signup/Login with JWT)
-   📝 **User Profile Management**
-   💼 **Experience & Education Tracking**
-   🔐 **Secure API Routes with Middleware**
-   🌐 **MongoDB Integration with Mongoose**

---

## 🏗️ Installation & Setup

### 1️⃣ Clone the Repository 📥

```bash
git clone https://github.com/yourusername/devconnector.git
cd devconnector
```

### 2️⃣ Install Dependencies 📦

```bash
npm install
```

### 3️⃣ Set Up Environment Variables ⚙️

Create a `.env` or `.env.dev` file in the root directory and add:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=dev
PORT=5000
```

### 4️⃣ Run the Server 🚀

```bash
npm start  # Production mode
npm run dev  # Development mode (nodemon)
```

Server will start at **`http://localhost:5000`**

---

## 🔗 API Endpoints

### 🛠️ **Auth Routes** (`/api/auth`)

| Method | Route     | Description          | Access |
| ------ | --------- | -------------------- | ------ |
| POST   | `/signup` | Register new user ✍️ | Public |
| POST   | `/login`  | Authenticate user 🔑 | Public |

### 👤 **Profile Routes** (`/api/profile`)

| Method | Route                     | Description            | Access  |
| ------ | ------------------------- | ---------------------- | ------- |
| POST   | `/profile`                | Create user profile ✨ | Private |
| GET    | `/profile`                | Get user profile 📄    | Private |
| PATCH  | `/profile/experience`     | Add experience 💼      | Private |
| DELETE | `/profile/experience/:id` | Remove experience ❌   | Private |

---

## 🗄️ Database Models (MongoDB)

### **User Model** 👤

```js
{
  name: String,
  email: String,
  password: String (hashed),
  avatar: String (Gravatar URL),
  timestamps: true
}
```

### **Profile Model** 📄

```js
{
  user_id: ObjectId,
  status: String,
  skills: [String],
  bio: String,
  experience: [{ title, company, from, to, current }],
  education: [{ school, degree, fieldofstudy, from, to, current }],
  timestamps: true
}
```

---

## 🔒 Authentication & Security

-   **JWT Authentication** for secure user sessions 🔑
-   **Bcrypt.js** for password hashing 🔐
-   **Custom Error Handling** using middleware ⚠️

---

## 🛠️ Future Enhancements

-   📢 **Posts & Comments** (Developer discussions)
-   📍 **Location-based Developer Search**
-   📬 **Messaging System** (Chat between developers)

---

## 🤝 Contributing

PRs are welcome! Feel free to fork the repo and submit changes. 🚀

---

## 📝 License

This project is **open-source** and available under the **MIT License**. 📝

**Made with ❤️ by [Abhisek](https://github.com/abhisekadhikari)!**

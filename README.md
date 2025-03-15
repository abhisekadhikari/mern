# DevConnector 🚀

DevConnector is a social networking platform for developers to connect, share posts, and showcase their professional experience.

## Features 🌟

-   User Authentication (JWT-based)
-   Create, Update, Delete Posts 📝
-   Like & Unlike Posts ❤️
-   Add & Delete Comments 💬
-   Manage Developer Profiles 🏗️
-   Secure Routes with Authentication 🔐

## Tech Stack 🛠️

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB, Mongoose
-   **Authentication**: JWT, bcrypt
-   **Validation**: express-validator

## Installation & Setup ⚡

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/devconnector.git
    ```
2. Navigate to the project folder:
    ```sh
    cd devconnector
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Set up your environment variables:
    - Create a `.env` file in the root directory
    - Add the following variables:
        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_secret_key
        ```
5. Start the development server:
    ```sh
    npm run dev
    ```

## API Endpoints 📡

| Endpoint                           | Method | Description                     | Access  |
| ---------------------------------- | ------ | ------------------------------- | ------- |
| `/api/auth/register`               | POST   | Register a new user 🔑          | Public  |
| `/api/auth/login`                  | POST   | Login and receive a token 🔑    | Public  |
| `/api/user/profile`                | GET    | Get logged-in user's profile 👤 | Private |
| `/api/user/profile`                | PUT    | Update user profile 👤          | Private |
| `/api/post`                        | POST   | Create a new post 📝            | Private |
| `/api/post`                        | GET    | Retrieve all posts 📝           | Public  |
| `/api/post/:id`                    | PUT    | Update a post by ID 📝          | Private |
| `/api/post/:id`                    | DELETE | Delete a post by ID 📝          | Private |
| `/api/post/:id/like`               | POST   | Like a post ❤️                  | Private |
| `/api/post/:id/unlike`             | DELETE | Unlike a post ❤️                | Private |
| `/api/post/:id/comment`            | POST   | Add a comment to a post 💬      | Private |
| `/api/post/:id/comment/:commentId` | DELETE | Delete a comment 💬             | Private |

## Contribution 🤝

Contributions are welcome! Feel free to fork this repository and submit a pull request.

## License 📜

This project is licensed under the MIT License.

---

Happy Coding! 🚀

**Made with ❤️ by [Abhisek](https://github.com/abhisekadhikari)!**

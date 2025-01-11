# Blogging Platform

Welcome to the Blogging Platform project! This is a **full-stack** web application that demonstrates the basic functionalities of a blog site—including user authentication, creating and managing blog posts, and adding comments. It’s built using **Node.js (Express.js) for the backend** and **React + Redux** for the frontend. For styling, **Tailwind CSS** has been implemented to create a clean and responsive UI.

## Table of Contents
1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Getting Started](#getting-started)  
4. [Running the Application](#running-the-application)  
5. [Endpoints & Functionality](#endpoints--functionality)  
6. [Future Improvements](#future-improvements)  

---

## Features

1. **User Authentication**  
   - Sign up, log in, and log out flow using **JWT (JSON Web Tokens)**.
   - Private routes are secured so only authenticated users can create, edit, or delete their own posts.

2. **Blog Posts (CRUD)**  
   - **Create** a new blog post with a title and content.  
   - **Read** all posts or a specific post.  
   - **Update** an existing blog post, but only if you are the author.  
   - **Delete** your own blog post.

3. **Comments on Posts**  
   - **Add** comments to blog posts.
   - Each comment includes the commenter’s name and the comment text.

4. **Responsive UI**  
   - Utilizes **Tailwind CSS** for a clean, modern, and responsive look.

---

## Tech Stack

- **Backend**: Node.js, Express.js  
- **Frontend**: React, Redux  
- **Styling**: Tailwind CSS  
- **Authentication**: JWT (JSON Web Tokens)  
- **Database**: MongoDB

---

1. **Clone the Repository**  
   ```
   git clone https://github.com/yourusername/your-blogging-platform.git
   cd your-blogging-platform
   ```

2. **Backend Setup**  
   - Navigate to the `backend/` folder:  
     ```
     cd backend
     npm install
     ```
   - (Optional) If you’re using a database, set up and configure your database connection in your environment variables or config file.
   - Create a `.env` file in the `backend/` directory, and specify your environment variables (e.g., `JWT_SECRET`, `DATABASE_URL` if using a DB).
   - I have not removed my .env file. I have given access of my cluster to everyone on the internet. But, if for some reason it won't work follow the previous instruction.

3. **Frontend Setup**  
   - Navigate to the `frontend/` folder:  
     ```
     cd ../frontend
     npm install
     ```
   - Make sure to install Tailwind dependencies if not already included:
     ```
     npm install -D tailwindcss postcss autoprefixer
     ```
   - The project is preconfigured to use Tailwind CSS (check `tailwind.config.js` and `postcss.config.js` for reference).

---

## Running the Application

1. **Start the Backend (API server)**  
   - In the `backend/` folder, run:  
     ```
     npm start
     ```
   - This starts your Express server on a specified port (commonly `http://localhost:5000/` or whichever port is set in `.env`).

2. **Start the Frontend (React app)**  
   - In a separate terminal, go to the `frontend/` folder:  
     ```
     cd frontend
     npm start
     ```
   - This starts your React application on `http://localhost:3000/` by default.

---

## Endpoints & Functionality

### Authentication
- **Sign Up**: `POST /auth/signup`  
  Receives user details (username, password, etc.) and creates a new account.
- **Log In**: `POST /auth/login`  
  Authenticates a user and returns a JWT if credentials are valid.
- **Log Out**: Handled in the frontend by removing JWT from local storage or Redux store.

### Blog Posts
- **Create**: `POST /posts`  
  Requires JWT in the request headers (e.g., `Authorization: Bearer <token>`).  
- **Read all**: `GET /posts`  
- **Read one**: `GET /posts/:id`  
- **Update**: `PUT /posts/:id`  
  Only the author can update. Requires JWT.  
- **Delete**: `DELETE /posts/:id`  
  Only the author can delete. Requires JWT.

### Comments
- **Add comment**: `POST /posts/:id/comments`  
  Provide `commenterName` and `content`.  

---

## Future Improvements

- **Sorting & Filtering** (Bonus #1): Add the ability to sort or filter posts by author, date, or content.  
- **Unit Testing** (Bonus #3): Implement automated unit tests with a testing framework such as Jest for both the backend routes and potentially the frontend Redux actions/reducers.  
- **Improved Error Handling**: Provide more detailed error messages and handle edge cases gracefully.  
- **Pagination**: For larger databases, implement pagination on the posts list for better performance.  

---

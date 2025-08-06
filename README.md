# Spondonhub E-commerce Platform

[![CI Status](https://github.com/your-username/spondonhub/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/spondonhub/actions/workflows/ci.yml)

Welcome to Spondonhub, a full-stack e-commerce application built with modern web technologies. This project serves as a complete blueprint for creating a robust, scalable, and professional online store.

## ✨ Features

- **Full-featured Shopping Cart:** Add, remove, and update products in the cart.
- **Product Reviews and Ratings:** Users can leave reviews and ratings for products.
- **User Authentication:** Secure user registration and login with JWT.
- **Admin Panel:** A dedicated dashboard for admins to manage products, users, and orders.
- **Responsive Design:** A beautiful and functional UI that works on all devices.
- **Content Management:** Blog and static pages for enhanced user engagement.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, React Router, Axios, SCSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Tokens), bcryptjs
- **Testing:** Jest, Supertest (for backend)
- **DevOps:** GitHub Actions, Docker (optional)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or a cloud instance like MongoDB Atlas)
- [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/spondonhub.git
    cd spondonhub
    ```

2.  **Setup Environment Variables:**
    -   In the root directory, rename `.env.example` to `.env`.
    -   Open the `.env` file and fill in your configuration details (Database URI, JWT Secret, etc.).

3.  **Install Backend Dependencies:**
    ```bash
    cd server
    npm install
    ```

4.  **Install Frontend Dependencies:**
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1.  **Run the Backend Server:**
    -   From the `server` directory:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5001`.

2.  **Run the Frontend Client:**
    -   From the `client` directory (in a new terminal):
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:3000`.

## 📜 Available Scripts

### In the `client` directory:
- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the code using ESLint.
- `npm run format`: Formats the code using Prettier.

### In the `server` directory:
- `npm run dev`: Starts the backend server with Nodemon.
- `npm run start`: Starts the backend server for production.
- `npm run test`: Runs the automated tests using Jest.
- `npm run lint`: Lints the code.
- `npm run format`: Formats the code.

## 📄 API Documentation

Detailed API documentation can be found in the `/docs` directory.

## ⚖️ License

This project is licensed under the MIT License - see the `LICENSE` file for details.
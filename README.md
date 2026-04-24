# GJ 5 Fashion - Rental & Retail Management System

Welcome to the **GJ 5 Fashion** project! This is a comprehensive, production-ready full-stack application built using the MERN stack (MongoDB, Express, React/Next.js, Node.js) to manage a high-end clothing rental and retail business.

## 🌟 Project Overview

The GJ 5 Fashion platform is designed to handle the complexities of a multi-branch clothing retailer. It allows customers to browse collections, check availability, and request rentals or purchases. For staff and administrators, it provides a powerful, highly-aesthetic dashboard to manage inventory, branches, customers, and the complete order lifecycle (from request to return).

### Core Architecture

- **Frontend (`/frontend`)**: A modern Next.js 16 (App Router) application styled with Tailwind CSS. It uses Zustand for state management and Axios for API communication. It features both a public-facing customer portal and a secure admin dashboard.
- **Backend (`/backend`)**: A robust Node.js and Express API written in TypeScript. It uses Mongoose to interact with a MongoDB database, and implements secure, JWT-based Role-Based Access Control (RBAC).

## 🚀 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or a local MongoDB instance)

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ADMIN_EMAIL=admin@gj5fashion.com
   ADMIN_PASSWORD=password123
   ```
4. Run the database seeder to create your initial Admin account:
   ```bash
   npm run seed
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
4. Open your browser:
   - **Customer Website:** [http://localhost:3000](http://localhost:3000)
   - **Admin Portal:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## 🛡️ Security & Authentication

The application uses JSON Web Tokens (JWT) for authentication.

- The backend middleware verifies tokens and checks roles (`ADMIN` or `STAFF`) before allowing access to protected routes.
- Passwords are securely hashed using `bcryptjs` before being stored in the database.
- The frontend securely manages sessions using `Zustand` and `localStorage`, redirecting unauthenticated users away from the `/admin` routes automatically.

## 🤝 Contributing

When contributing to this project, please ensure you:

- Follow the existing Tailwind CSS design tokens (specifically the `#E5202B` primary brand color).
- Maintain TypeScript strictness in both the frontend and backend.
- Run `npm run build` in both directories before submitting changes to ensure there are no compilation errors.

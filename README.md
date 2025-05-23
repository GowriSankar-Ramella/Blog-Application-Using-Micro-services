# 📝 Blog Microservice Platform

A full-stack **blogging application** built using a **Microservices architecture**. Designed for scalability, performance, and modular development, this platform enables users to create, browse, and manage blogs with a smooth and interactive UI.

---

## 🚀 Tech Stack

### 🧠 Backend (Microservices)
- **User Service**: Handles authentication, registration, profile management.
- **Blog Service**: Manages blog creation, editing, saving, and deletion.
- **Author Service**: Handles author profiles and extended metadata.

### ⚙️ Core Technologies
- **Node.js + Express** – Backend runtime and routing.
- **MongoDB** – Database unstructured data.
- **Redis** – Used for caching frequently accessed blog and user data to boost performance.
- **RabbitMQ** – Implements a message queue system to **synchronize cache invalidation** across microservices.
- **Cloudinary** – For image uploads (user avatars, blog images).
- **JWT + HttpOnly Cookies** – Secure authentication.
- **Docker (optional)** – Containerized services for easier deployment.

---

## 🎨 Frontend
- **React.js** (Vite) with **CSS Modules**
- Fully responsive design
- Rich text editor for blogs
- Smart search and filter system
- Animated landing page with login/register
- Role-based access (User, Author)

---

## 🏗️ Microservices Architecture

The system is built using separate services for better scalability and maintainability:

User Service <---> Blog Service <---> Author Service
| | |
|--- Redis Cache <--> RabbitMQ <--> Cache Invalidation


- Each service handles a specific domain and communicates internally via **RabbitMQ**.
- **Redis** is used to cache commonly accessed data like user profiles and blog posts.
- When a blog or profile is updated, a message is sent to other services to **invalidate stale cache** entries — ensuring **consistency** without heavy inter-service calls.

---

## 📦 Features

- ✅ Register/Login with secure cookie-based auth
- 🧑 View and edit author profiles
- 📝 Create, edit, and delete blogs (with rich text and images)
- 🔍 Filter blogs by category, search bar
- 💾 Save blogs to favorites
- 💬 Comment system on blog detail page
- 📷 Author and blog images uploaded via Cloudinary
- 📜 Caching and cache invalidation using Redis + RabbitMQ
- 🌐 Responsive frontend with smooth UI

---

## 📂 Folder Structure (Backend)

/user-service
/blog-service
/author-service


Each service is independently deployable and maintainable.

---

## 🧪 Getting Started (Local Setup)

```bash
# Clone the repo
git clone https://github.com/your-username/blog-microservice-app.git
cd blog-microservice-app

# Setup each microservice (example: User Service)
cd user-service
npm install
npm run dev

# Repeat for blog-service and author-service

# Start Redis and RabbitMQ (optional via Docker)
docker-compose up -d

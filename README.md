````markdown
# 📝 Blog Application Using Microservices

A full-stack blogging platform built with microservices architecture, featuring independent services for user management, blog operations, and author functionalities. The application includes a modern React frontend with real-time features and cloud-based media storage.

---

## 🏗️ Architecture Overview

This application follows a microservices architecture pattern with the following services:

- **User Service**: Handles user authentication, registration, and profile management
- **Blog Service**: Manages blog posts, comments, and saved blogs functionality
- **Author Service**: Dedicated service for author-specific operations and content management
- **Frontend**: React-based SPA with modern UI/UX

Each service is independently deployable and maintainable and communicates internally via **RabbitMQ** for messaging and **Redis** for caching.

---

## 🚀 Features

### Backend Features

- **Microservices Architecture**: Scalable and maintainable service separation
- **JWT Authentication**: Secure token-based authentication across services
- **File Upload**: Cloudinary integration for image and media storage
- **Message Queue**: RabbitMQ for inter-service communication
- **Database**: MongoDB with Mongoose ODM
- **API Documentation**: RESTful API design
- **Error Handling**: Centralized error management
- **CORS Support**: Cross-origin resource sharing enabled

### Frontend Features

- **Modern React**: Built with React 19 and latest ecosystem
- **Responsive Design**: Mobile-first responsive UI
- **Rich Text Editor**: Jodit React editor for blog content creation
- **Routing**: React Router DOM for navigation
- **State Management**: Context API for authentication state
- **Animations**: Framer Motion for smooth animations
- **Icons**: React Icons library integration
- **Build Tool**: Vite for fast development and building

### User Features

- Register/Login with secure cookie-based auth
- View/edit author profiles
- Create, edit, and delete blogs (with rich text and images)
- Filter blogs by category/search bar
- Save blogs to favorites
- Comment system on blog detail page

---

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **Message Queue**: RabbitMQ (amqplib)
- **Caching**: Redis
- **Security**: bcrypt for password hashing
- **Middleware**: CORS, Cookie Parser, Multer

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Text Editor**: Jodit React
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Linting**: ESLint

---

## 📁 Project Structure

```
Blog-Application-Using-Micro-services/
├── backend/
│   ├── authorService/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── utils/
│   │   │   └── config/
│   │   └── package.json
│   ├── blogService/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── utils/
│   │   └── package.json
│   ├── userService/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── middleware/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   └── utils/
│   │   └── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   │   ├── assets/
│   │   │   └── screenshots/
│   │   └── vite.svg
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── README.md
└── README.md (this file)
```

---

## 🏁 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB
- RabbitMQ
- Redis (for blog service)
- Cloudinary account (for file uploads)

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "Blog-Application-Using-Micro-services"
   ```

2. **Set up User Service**

   ```bash
   cd backend/userService
   npm install
   ```
   Create `.env` file:
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/blog_users
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRY=7d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

3. **Set up Blog Service**

   ```bash
   cd ../blogService
   npm install
   ```
   Create `.env` file:
   ```env
   PORT=3002
   MONGODB_URI=mongodb://localhost:27017/blog_posts
   JWT_SECRET=your_jwt_secret
   RABBITMQ_URL=amqp://localhost
   REDIS_URL=redis://localhost:6379
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. **Set up Author Service**

   ```bash
   cd ../authorService
   npm install
   ```
   Create `.env` file:
   ```env
   PORT=3003
   MONGODB_URI=mongodb://localhost:27017/blog_authors
   JWT_SECRET=your_jwt_secret
   RABBITMQ_URL=amqp://localhost
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

### Frontend Setup

1. **Go to frontend directory**

   ```bash
   cd ../../frontend
   npm install
   ```
2. **Create `.env` file:**
   ```env
   VITE_API_BASE_URL=http://localhost:3001
   VITE_BLOG_SERVICE_URL=http://localhost:3002
   VITE_AUTHOR_SERVICE_URL=http://localhost:3003
   ```

---

## 🏃‍♂️ Running the Application

### Start Backend Services

1. **User Service**
   ```bash
   cd backend/userService
   npm start
   ```
2. **Blog Service**
   ```bash
   cd backend/blogService
   npm start
   ```
3. **Author Service**
   ```bash
   cd backend/authorService
   npm start
   ```

### Start Frontend

```bash
cd frontend
npm run dev
```

**Application URLs:**
- Frontend: `http://localhost:5173`
- User Service: `http://localhost:3001`
- Blog Service: `http://localhost:3002`
- Author Service: `http://localhost:3003`

---

## 📄 API Documentation

### User Service Endpoints

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/logout` - User logout

### Blog Service Endpoints

- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/:id` - Get blog by ID
- `PUT /api/blogs/:id` - Update blog
- `DELETE /api/blogs/:id` - Delete blog
- `POST /api/blogs/:id/comments` - Add comment
- `POST /api/blogs/:id/save` - Save/unsave blog

### Author Service Endpoints

- `GET /api/authors` - Get all authors
- `GET /api/authors/:id` - Get author profile
- `PUT /api/authors/:id` - Update author profile
- `GET /api/authors/:id/blogs` - Get author's blogs

---

## ⚙️ Configuration

### Backend Environment Variables

Each service requires specific environment variables. Refer to the `.env.example` files in each service directory for the complete list.

- MongoDB URI (unique per service)
- RabbitMQ URL
- Redis URL (for blog service)
- Cloudinary credentials

### Frontend Environment Variables

| Variable                  | Description            | Default                 |
| ------------------------- | ---------------------- | ----------------------- |
| `VITE_API_BASE_URL`       | User Service API URL   | `http://localhost:3001` |
| `VITE_BLOG_SERVICE_URL`   | Blog Service API URL   | `http://localhost:3002` |
| `VITE_AUTHOR_SERVICE_URL` | Author Service API URL | `http://localhost:3003` |

---

## 🧪 Testing

```bash
# Run tests for each service
cd backend/userService && npm test
cd backend/blogService && npm test
cd backend/authorService && npm test

# Run frontend tests
cd frontend && npm test
```

---

## 🚢 Deployment

### Docker Deployment (Recommended)

1. Create `docker-compose.yml` for orchestrating all services
2. Use Docker containers for each microservice
3. Set up environment-specific configuration files

### Traditional Deployment

1. Deploy each service to separate servers or containers
2. Configure load balancers for high availability
3. Set up monitoring and logging
4. Configure CI/CD pipelines

---

## 🧩 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure backend services are running
   - Check API URLs in environment variables

2. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check for TypeScript errors if using TypeScript

3. **Development Server Issues**
   - Check if port 5173 is available
   - Try `npm run dev -- --port 3000` for different port

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Express.js community for the excellent framework
- React team for the amazing frontend library
- MongoDB team for the flexible database solution
- Cloudinary for media storage services
- RabbitMQ for reliable message queuing
- Vite team for the blazing fast build tool
- Tailwind CSS for the utility-first CSS framework
- Jodit team for the rich text editor

---

## 🔭 Future Enhancements

- [ ] Add real-time notifications
- [ ] Implement search functionality
- [ ] Add social media integration
- [ ] Implement email notifications
- [ ] Add analytics dashboard
- [ ] Implement caching strategies
- [ ] Add automated testing
- [ ] Implement CI/CD pipeline
- [ ] Add API rate limiting
- [ ] Implement monitoring and logging

---
````

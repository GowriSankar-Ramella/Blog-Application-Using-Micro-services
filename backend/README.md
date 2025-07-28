# Blog Application Using Microservices

A full-stack blogging platform built with microservices architecture, featuring separate services for user management, blog operations, and author functionalities. The application includes a modern React frontend with real-time features and cloud-based media storage.

## 🏗️ Architecture Overview

This application follows a microservices architecture pattern with the following services:

- **User Service**: Handles user authentication, registration, and profile management
- **Blog Service**: Manages blog posts, comments, and saved blogs functionality
- **Author Service**: Dedicated service for author-specific operations and content management
- **Frontend**: React-based SPA with modern UI/UX

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

- User registration and authentication
- Profile management with avatar upload
- Create, edit, and delete blog posts
- Rich text editing with media support
- Comment system on blog posts
- Save/bookmark favorite blogs
- Author profiles and portfolios
- Responsive design for all devices

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

## 📁 Project Structure

```
Blog App Using Microservices/
├── backend/
│   ├── authorService/           # Author management service
│   │   ├── src/
│   │   │   ├── controllers/     # Route controllers
│   │   │   ├── middleware/      # Custom middleware
│   │   │   ├── models/         # Database models
│   │   │   ├── routes/         # API routes
│   │   │   ├── utils/          # Utility functions
│   │   │   └── config/         # Configuration files
│   │   └── package.json
│   ├── blogService/            # Blog management service
│   │   ├── src/
│   │   │   ├── controllers/    # Route controllers
│   │   │   ├── middleware/     # Custom middleware
│   │   │   ├── models/         # Database models
│   │   │   ├── routes/         # API routes
│   │   │   └── utils/          # Utility functions
│   │   └── package.json
│   ├── userService/            # User management service
│   │   ├── src/
│   │   │   ├── controllers/    # Route controllers
│   │   │   ├── middleware/     # Custom middleware
│   │   │   ├── models/         # Database models
│   │   │   ├── routes/         # API routes
│   │   │   └── utils/          # Utility functions
│   │   └── package.json
│   └── README.md
└── frontend/                   # React frontend application
    ├── src/
    │   ├── components/         # Reusable components
    │   ├── pages/             # Page components
    │   ├── context/           # React context
    │   ├── api/               # API configuration
    │   └── styles/            # Styling files
    ├── public/                # Static assets
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- RabbitMQ
- Redis (for blog service)
- Cloudinary account (for file uploads)

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "Blog App Using Microservices"
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

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3001
VITE_BLOG_SERVICE_URL=http://localhost:3002
VITE_AUTHOR_SERVICE_URL=http://localhost:3003
```

## 🏃‍♂️ Running the Application

### Start Backend Services

1. **Start User Service**

   ```bash
   cd backend/userService
   npm start
   ```

2. **Start Blog Service**

   ```bash
   cd backend/blogService
   npm start
   ```

3. **Start Author Service**
   ```bash
   cd backend/authorService
   npm start
   ```

### Start Frontend

```bash
cd frontend
npm run dev
```

The application will be available at:

- Frontend: `http://localhost:5173`
- User Service: `http://localhost:3001`
- Blog Service: `http://localhost:3002`
- Author Service: `http://localhost:3003`

## 📚 API Documentation

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

## 🔧 Configuration

### Environment Variables

Each service requires specific environment variables. Refer to the `.env.example` files in each service directory for the complete list of required variables.

### Database Configuration

- Each microservice connects to its own MongoDB database
- Ensure MongoDB is running on your system
- Database names are configurable via `MONGODB_URI` environment variable

### Message Queue Setup

- Install and start RabbitMQ server
- Configure `RABBITMQ_URL` in services that use message queuing
- Used for inter-service communication

## 🧪 Testing

```bash
# Run tests for each service
cd backend/userService && npm test
cd backend/blogService && npm test
cd backend/authorService && npm test

# Run frontend tests
cd frontend && npm test
```

## 🚀 Deployment

### Docker Deployment (Recommended)

1. Create `docker-compose.yml` for orchestrating all services
2. Use Docker containers for each microservice
3. Set up environment-specific configuration files

### Traditional Deployment

1. Deploy each service to separate servers or containers
2. Configure load balancers for high availability
3. Set up monitoring and logging
4. Configure CI/CD pipelines

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - Initial work - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Express.js community for the excellent framework
- React team for the amazing frontend library
- MongoDB team for the flexible database solution
- Cloudinary for media storage services
- RabbitMQ for reliable message queuing

## 📞 Support

For support, email your-email@example.com or create an issue in this repository.

## 🔮 Future Enhancements

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

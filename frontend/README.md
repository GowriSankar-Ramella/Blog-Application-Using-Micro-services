# Blog App Frontend

A modern React frontend for the Blog Application built with microservices architecture. This frontend communicates with multiple backend services to provide a seamless blogging experience.

## 🌟 Features

- **Modern React 19**: Built with the latest React features and hooks
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Rich Text Editor**: Jodit React editor for creating and editing blog content
- **Authentication**: JWT-based authentication with protected routes
- **Real-time Updates**: Dynamic content loading and updates
- **File Uploads**: Image and media upload capabilities
- **Smooth Animations**: Framer Motion for enhanced user experience
- **Fast Development**: Vite for lightning-fast development and building

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Jodit React** - Rich text editor component
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **ESLint** - Code linting and formatting

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── BlogCard.jsx     # Blog card component
│   │   ├── Layout.jsx       # Main layout wrapper
│   │   └── Navbar.jsx       # Navigation component
│   ├── pages/               # Page components
│   │   ├── AddEditBlog.jsx  # Blog creation/editing
│   │   ├── BlogDetail.jsx   # Individual blog view
│   │   ├── CommentSection.jsx # Comment functionality
│   │   ├── EditProfile.jsx  # User profile editing
│   │   ├── Home.jsx         # Home page
│   │   ├── LandingPage.jsx  # Landing page
│   │   ├── Login.jsx        # Login page
│   │   ├── Profile.jsx      # User profile
│   │   ├── ProtectedRoute.jsx # Route protection
│   │   ├── Register.jsx     # Registration page
│   │   └── SavedBlogs.jsx   # Saved blogs page
│   ├── context/             # React Context
│   │   └── AuthContext.jsx  # Authentication context
│   ├── api/                 # API configuration
│   │   └── axios.js         # Axios configuration
│   ├── assets/              # Static assets
│   ├── styles/              # Custom styles
│   ├── App.jsx              # Main App component
│   ├── App.css              # Global styles
│   ├── main.jsx             # Application entry point
│   └── index.css            # Base styles
├── public/                  # Static public assets
│   ├── assets/
│   │   └── screenshots/     # Application screenshots
│   └── vite.svg
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend services running (User Service, Blog Service, Author Service)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "Blog App Using Microservices/frontend"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the frontend directory:

   ```env
   VITE_API_BASE_URL=http://localhost:3001
   VITE_BLOG_SERVICE_URL=http://localhost:3002
   VITE_AUTHOR_SERVICE_URL=http://localhost:3003
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 📋 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🔧 Configuration

### Environment Variables

| Variable                  | Description            | Default                 |
| ------------------------- | ---------------------- | ----------------------- |
| `VITE_API_BASE_URL`       | User Service API URL   | `http://localhost:3001` |
| `VITE_BLOG_SERVICE_URL`   | Blog Service API URL   | `http://localhost:3002` |
| `VITE_AUTHOR_SERVICE_URL` | Author Service API URL | `http://localhost:3003` |

### Vite Configuration

The project uses Vite with the following plugins:

- `@vitejs/plugin-react` - React support with Fast Refresh
- `@tailwindcss/vite` - Tailwind CSS integration

### ESLint Configuration

ESLint is configured with:

- React hooks rules
- React refresh rules
- Modern JavaScript standards

## 🎨 UI Components

### Core Components

- **Layout** - Main application layout with navigation
- **Navbar** - Responsive navigation component
- **BlogCard** - Reusable blog post card
- **ProtectedRoute** - Route protection for authenticated users

### Pages

- **LandingPage** - Public landing page
- **Home** - Main dashboard for authenticated users
- **Login/Register** - Authentication pages
- **Profile/EditProfile** - User profile management
- **AddEditBlog** - Blog creation and editing
- **BlogDetail** - Individual blog post view
- **CommentSection** - Comment functionality
- **SavedBlogs** - User's saved blog posts

## 🌐 API Integration

The frontend communicates with three backend services:

1. **User Service** (`/api/users/`)

   - Authentication (login, register, logout)
   - Profile management
   - User data operations

2. **Blog Service** (`/api/blogs/`)

   - Blog CRUD operations
   - Comment management
   - Blog saving/bookmarking

3. **Author Service** (`/api/authors/`)
   - Author profiles
   - Author-specific content

### API Client Configuration

```javascript
// api/axios.js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
```

## 🎯 Features Overview

### Authentication

- JWT-based authentication
- Protected routes
- Automatic token refresh
- Login/logout functionality

### Blog Management

- Create and edit blogs with rich text editor
- Upload images and media
- Save/bookmark blogs
- Comment on posts
- Responsive blog cards

### User Experience

- Smooth page transitions
- Loading states
- Error handling
- Mobile-responsive design
- Dark/light theme support (if implemented)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deployment Options

1. **Vercel** (Recommended for Vite projects)

   ```bash
   npm i -g vercel
   vercel --prod
   ```

2. **Netlify**

   - Connect your repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **Traditional Hosting**
   - Upload `dist` folder contents to your web server
   - Configure server for SPA routing

### Environment Variables for Production

Make sure to set the correct API URLs for your production backend services.

## 🧪 Testing

```bash
# Run tests (when test suite is added)
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📱 Screenshots

The application includes several screenshots in `public/assets/screenshots/`:

- `discover.jpg` - Blog discovery page
- `editor.jpg` - Rich text editor
- `responsive.jpg` - Responsive design showcase

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting: `npm run lint`
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure backend services are running
   - Check API URLs in environment variables

2. **Build Errors**

   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check for TypeScript errors if using TS

3. **Development Server Issues**
   - Check if port 5173 is available
   - Try `npm run dev -- --port 3000` for different port

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing fast build tool
- Tailwind CSS for the utility-first CSS framework
- Jodit team for the rich text editor

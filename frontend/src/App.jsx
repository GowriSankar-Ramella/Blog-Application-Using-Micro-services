import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AddEditBlog from "./pages/AddEditBlog";
import BlogDetail from "./pages/BlogDetail";
import EditProfile from "./pages/EditProfile";
import SavedBlogs from "./pages/SavedBlogs";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/saved" element={<ProtectedRoute><SavedBlogs /></ProtectedRoute>} />
          <Route path="/add" element={<ProtectedRoute><AddEditBlog /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><AddEditBlog /></ProtectedRoute>} />
          <Route path="/blog/:id" element={<ProtectedRoute><BlogDetail /></ProtectedRoute>} />
          <Route path="/profile/edit" element={<ProtectedRoute><EditProfile/></ProtectedRoute>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
     </> 
  );
}

export default App;

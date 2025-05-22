import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-white tracking-tight">
          Blogify<span className="text-yellow-300">.</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link
                to="/"
                className="text-white hover:text-yellow-300 font-medium transition duration-200"
              >
                Home
              </Link>
              <Link
                to="/saved"
                className="text-white hover:text-yellow-300 font-medium transition duration-200"
              >
                Saved
              </Link>
              <Link
                to={`/profile/${user._id}`}
                className="text-white hover:text-yellow-300 font-medium transition duration-200"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-yellow-300 font-medium transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-yellow-300 font-medium transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

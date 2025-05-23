import { createContext, useContext, useEffect, useState } from "react";
import { userService } from "../api/axios"; // Axios instance with `withCredentials: true`
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch user data using cookie token
  const fetchUser = async () => {
    try {
      const res = await userService.get("/me"); // No ID needed, backend extracts from cookie
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // Load user on app start
  }, []);

  const login = async (formData) => {
    try {
      const res = await userService.post("/login", formData); // Cookie set here
      await fetchUser(); // Fetch and set user after login
      navigate("/home");
    } catch (error) {
      throw error; // Bubble error to handle in component
    }
  };

  const logout = async () => {
    try {
      await userService.get("/logout");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading,setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

import axios from "axios";

export const userService = axios.create({
  baseURL: "http://localhost:3000/api/users", 
  withCredentials: true, 
});

export const blogService = axios.create({
  baseURL: "http://localhost:3002/api", 
  withCredentials: true, 
});

export const authorService = axios.create({
  baseURL: "http://localhost:3001/api/author/blog", 
  withCredentials: true, 
});


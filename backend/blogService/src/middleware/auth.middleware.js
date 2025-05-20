import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import axios from "axios";

const isAuthenticated = AsyncHandler(async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    throw new ApiError(401, "No access token found");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid access token");
  }

  // Call UserService to validate the user
  try {
    const userServiceURL = `http://localhost:3000/api/users/${decodedToken._id}`; 
    
    const { data: user } = await axios.get(userServiceURL)

    if (!user) {
      throw new ApiError(401, "User not found in UserService");
    }

    console.log(user)

    req.user = user.data;
    next();
  } catch (err) {
    throw new ApiError(401, "Failed to authenticate user from UserService");
  }
});

export { isAuthenticated };

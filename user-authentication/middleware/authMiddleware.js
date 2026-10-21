
import jwt from "jsonwebtoken";
import userModel from "../models/users.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find user from token ID
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User no longer exists",
      });
    }

    // Attach user to request
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role : user.role
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired, please login again",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    console.error("Auth middleware error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


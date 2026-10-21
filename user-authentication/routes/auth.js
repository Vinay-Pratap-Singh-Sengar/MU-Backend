
import express from "express";
import {
    getAllUser,
    getUserById,
    login,
    register
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/list", protect, getAllUser);
router.get("/:id", protect, getUserById);

export default router;

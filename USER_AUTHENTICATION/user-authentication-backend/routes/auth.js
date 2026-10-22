
import express from "express";
import {
    deleteUserById,
    getAllUser,
    getUserById,
    login,
    register
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";
import { roleAuhorization } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/list", protect,roleAuhorization("admin"), getAllUser);
router.get("/:id", protect, getUserById);
router.delete("/:id", protect, roleAuhorization("admin"), deleteUserById)

export default router;

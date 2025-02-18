import express from "express";
import { CreateJobRole, getAllJobRoles } from "../controllers/JobRoleControllers.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { getUserData } from "../controllers/profileController.js";

const router = express.Router();

router.get("/user-data", authenticateUser, getUserData);

export default router;

import express from "express";
import { CreateJobRole, getAllJobRoles } from "../controllers/JobRoleControllers.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-job-role", authenticateUser, CreateJobRole);
router.get("/job-roles/:userId", authenticateUser, getAllJobRoles);

export default router;

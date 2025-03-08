import express from "express";
import { CreateJobRole, getAllJobRoles, getJobRole } from "../controllers/JobRoleControllers.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-job-role", authenticateUser, CreateJobRole);
router.get("/job-roles/:userId", authenticateUser, getAllJobRoles);
router.get("/get-job-role/:_id", authenticateUser, getJobRole);

export default router;

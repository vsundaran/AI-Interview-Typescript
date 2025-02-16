import express from "express";
import { CreateJobRole, getAllJobRoles } from "../../controllers/organisation/organisationControllers.js";
import { authenticateUser } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-job-role", authenticateUser, CreateJobRole);
router.post("/job-roles/:userId", authenticateUser, getAllJobRoles);

export default router;

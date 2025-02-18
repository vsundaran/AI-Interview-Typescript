import JobRole from "../models/organisation/JobRole.js";

// Register User
export const CreateJobRole = async (req, res) => {
    const {
        jobRole,
        experienced,
        targetCompanyName,
        salaryLevel,
        role,
    } = req.body;


    if (!jobRole || !experienced || !targetCompanyName || !salaryLevel) {
        return res
            .status(400)
            .json({ success: false, message: "Please fill mandatary fields" });
    }

    if (role !== "organisation" && role !== "candidate") {
        return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const jobRoleResponse = await JobRole.create({
        ...req.body,
    });

    if (jobRoleResponse) {
        res.status(201).json({
            success: true,
            jobRole: jobRoleResponse,
        });
    } else {
        res.status(400).json({ success: false, message: "Failed to create job role" });
    }
};


export const getAllJobRoles = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId)

        if (!userId) {
            return res.status(400).json({ success: false, message: "Organisation ID is required" });
        }

        const jobRoles = await JobRole.find({ userId });

        res.status(200).json({ success: true, jobRoles });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
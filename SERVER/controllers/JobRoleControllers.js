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
    const { userId } = req.user


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

    const jobRoles = await JobRole.find({ userId, role });

    // Map the jobRoles to return only required fields
    const filteredJobRoles = jobRoles.map(job => ({
        id: job._id,
        title: job.jobRole,
        status: job.status,
        scores: job.scores || null,
    }));


    if (jobRoleResponse) {
        res.status(201).json({
            success: true,
            jobRole: jobRoleResponse,
            filteredJobRoles: filteredJobRoles
        });
    } else {
        res.status(400).json({ success: false, message: "Failed to create job role" });
    }
};


export const getAllJobRoles = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }
        // Fetch job roles from the database
        const jobRoles = await JobRole.find({ userId, role });

        // Map the jobRoles to return only required fields
        const filteredJobRoles = jobRoles.map(job => ({
            id: job._id,
            title: job.jobRole,
            status: job.status,
            scores: job.scores || null,
        }));

        res.status(200).json({ success: true, jobRoles: filteredJobRoles });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
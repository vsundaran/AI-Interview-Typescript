import mongoose from "mongoose";

const JobRoleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobRole: { type: String, required: true },
    experienced: { type: String, required: true },
    yearsOfExperience: { type: String },
    technology: [String],
    skills: [String],
    targetCompanyName: { type: [String], required: true },
    salaryLevel: { type: String, required: true },
    degree: { type: String },
    education: { type: String },
    name: { type: String },
    lastProjectName: { type: String },
    interviewType: { type: String },
    jobDescriptionOrResume: { type: String },
    role: { type: String, enum: ["organisation", "candidate"], required: true },
    status: { type: String, required: true }
}, { timestamps: true });

const JobRole = mongoose.model("JobRole", JobRoleSchema);
export default JobRole;

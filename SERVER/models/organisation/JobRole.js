import mongoose from "mongoose";

const JobRoleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    jobRole: { type: String },
    experienced: { type: String },
    yearsOfExperience: { type: String },
    technology: [String],
    skills: [String],
    targetCompanyName: { type: [String] },
    salaryLevel: { type: String },
    degree: { type: String },
    education: { type: String },
    name: { type: String },
    lastProjectName: { type: String },
    interviewType: { type: String },
    jobDescriptionOrResume: { type: String },
    role: { type: String, enum: ["organisation", "candidate"] }
}, { timestamps: true });

const JobRole = mongoose.model("JobRole", JobRoleSchema);
export default JobRole;

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

import multer from "multer";
import { Storage } from "@google-cloud/storage";
import path from "path";


// Initialize Google Cloud Storage
const storage = new Storage({
    keyFilename: "../../ai-interview-cloud-storgae-e37a7ef2b000.json", // Replace with your actual path
});
const bucketName = "ai-interview-profile-pictures"; // Replace with your actual bucket name


// Configure Multer for file upload
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
}).single("profilePicture");

// Register User with profile
// export const registerUser = async (req, res) => {
//     upload(req, res, async function (err) {
//         if (err) return res.status(400).json({ success: false, message: err.message });

//         const { name, email, password, role } = req.body;

//         if (!name || !email || !password || !role) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         if (role !== "organisation" && role !== "candidate") {
//             return res.status(400).json({ success: false, message: "Invalid role" });
//         }

//         const userExists = await User.findOne({ email });
//         if (userExists) {
//             return res.status(400).json({ success: false, message: "User already exists" });
//         }

//         let profilePictureUrl = null;
//         if (req.file) {
//             const fileName = `${Date.now()}_${path.extname(req.file.originalname)}`;
//             const bucket = storage.bucket(bucketName);
//             const file = bucket.file(fileName);

//             await file.save(req.file.buffer, {
//                 contentType: req.file.mimetype,
//                 resumable: false,
//             });

//             profilePictureUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
//         }

//         const user = await User.create({
//             name,
//             email,
//             password,
//             role,
//             profilePicture: profilePictureUrl
//         });

//         if (user) {
//             const token = generateToken(user._id);
//             res.status(201).json({
//                 success: true,
//                 token,
//                 user: {
//                     _id: user._id,
//                     name: user.name,
//                     email: user.email,
//                     role: user.role,
//                     profilePicture: user.profilePicture,
//                 }
//             });
//         } else {
//             res.status(400).json({ success: false, message: "Invalid user data" });
//         }
//     });
// };
// Register User
export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (role !== "organisation" && role !== "candidate") {
        return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, password, role });
    if (user) {
        const token = generateToken(user._id);
        res.status(201).json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
    } else {
        res.status(400).json({ success: false, message: "Invalid user data" });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        res.status(400).json({ success: false, message: "email, password and role are required" });
    }

    const user = await User.findOne({ email, role });

    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);
        res.json({ success: true, token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
    } else {
        res.status(401).json({ success: false, message: "Invalid email or password" });
    }
};

// Logout User
export const logoutUser = (req, res) => {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.json({ success: true, message: "Logged out" });
};

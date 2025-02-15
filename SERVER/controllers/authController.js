import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

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

    const user = await User.findOne({ email });

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

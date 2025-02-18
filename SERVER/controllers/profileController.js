import User from "../models/User.js";

// Profile User
export const getUserData = async (req, res) => {
    const { userId } = req.user;

    if (!userId) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid user" });
    }

    const user = await User.findOne({ _id: userId }).select("-password");

    if (user) {
        res.status(201).json({
            success: true,
            user
        });
    } else {
        res.status(400).json({ success: false, message: "Failed to get user data" });
    }
};
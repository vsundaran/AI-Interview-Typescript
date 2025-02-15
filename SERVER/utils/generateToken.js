import jwt from "jsonwebtoken";

const genarateTokenLabel = (role) => {
    if (role === 'candidate') {
        return "candidateToken"
    } else if (role === 'employer') {
        return 'organisationToken'
    } else {
        return 'jwt'
    }
}

const generateToken = (res, userId, role) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.cookie(genarateTokenLabel(role), token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
};

export default generateToken;

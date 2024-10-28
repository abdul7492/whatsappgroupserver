import jwt from "jsonwebtoken";

export const generatetoken = (res, user) => {
    const token = jwt.sign(
        { id: user._id, isAdmin: user.admin },  // Payload data
        process.env.JWT_SECRET,                // Secret key
        { expiresIn: "30d" }                   // Token expiration time
    );

    // Setting the token in a cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Secure in production
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,             // 30 days
    });
};

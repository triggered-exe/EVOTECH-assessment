import Admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
//Authentication of token received while login
const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(400).json({ error: "Login First" });
        }
        const authentication = await jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(authentication.adminId);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default isAuthenticated;
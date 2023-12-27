import Admin from "../models/admin.model.js";
import jwt from 'jsonwebtoken';

export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    Admin.create({ name, email, password });

    res.status(200).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
      console.log(req.body);
      if (!admin) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      // Compare passwords
      if(password !== admin.password)
        return res.status(400).json({ error: "Invalid email or password" });
  
      // Generate a JSON web token (JWT)
      const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET);
  
      // Set the JWT as a cookie in the response
      res.cookie('token', token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),  secure: true });
  
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  export const adminLogout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successful" });
  };
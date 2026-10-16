import userModel from "../models/users.js"
import bcrypt from "bcrypt"

export const register = async(req, res) =>{
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                status: "failed",
                message: "All fields are required..."
            });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({
                status: "failed",
                message: "Password must be at least 8 characters..."
            });
        }

        // Check whether the user already exists
        const existing_user = await userModel.findOne({ email });

        if (existing_user) {
            return res.status(409).json({
                status: "failed",
                message: "User already exists..."
            });
        }

        // Hash the password
        const hash_password = await bcrypt.hash(password, 10);

        // Create a new user
        const new_user = await userModel.create({
            name,
            email,
            password: hash_password
        });
        
        return res.status(201).json({status : "successful" , message : "new user registered...", data : new_user})
    } catch (error) {
        return res.status(500).json ("error while registering new user...")
    }
}


import userModel from "../models/users.js"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    );
};

// // registration api : 
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

        // generate token : 
        const token = generateToken(new_user._id)
        
        return res.status(201).json({status : "successful" , message : "new user registered...", data : new_user , token})
    } catch (error) {
        return res.status(500).json ("error while registering new user...")
    }
}

// // login api : 
export const login = async(req, res) =>{
    try {
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.status(400).json({status : "failed" , message : "All fields are required..."});
        }

        const user = await userModel.findOne({email : email.trim().toLowerCase()}).select("+password");
        
        if(!user) {
           return res.status(401).json({status:"failed", message : "user has not registered yet do the registration first"}) 
        }

        // compare password 
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({status:"failed", message:"invalid email or password..."})
        }

        // generate token 
        const token = generateToken(user._id)
        return res.status(200).json({status : "Successful", message : "login successfully..", data : user, token})
    } catch (error) {
        return res.json({status : "failed",message : "error occured while login..."})
    }
}

// // get all user :
export const getAllUser = async(req, res) =>{
    try {
        const list = await userModel.find();
        return res.status(200).json({status: "Successful", list})
    } catch (error) {
        return res.json({message : "error while retrieving list of users"})
    }
}

// // get user by id:
export const getUserById = async(req, res) =>{
    try {
        const {id} = req.params;
        const profile = await userModel.findById(id)
        return res.status(200).json({status:"successful", profile})
    } catch (error) {
        return res.json({message:"error by retrieving single user"})
    }
}

// // delete user by id :

export const deleteUserById = async(req, res) =>{
    try {
        const {id} = req.params;

        const user = await userModel.findByIdAndDelete(id);

        if(!user){
            return res.status(404).json({
                status : "failed",
                message : "User not found..."
            })
        }

        return res.status(200).json({
            status : "successful",
            message : "user deleted sucessfully...."
        })
    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message : "error occured while deleting user using id"
        })
    }
}
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase : true,
            trim : true
        },
        password: {
            type: String,
            required: true,
            select: false,
            minlength:8
        },
        role : {
            type : String,
            enum : ['user','admin'],
            default : 'user'
        }
    },
    {
        timestamps: true
    }
);
const userModel = mongoose.model("user", userSchema);
export default userModel;

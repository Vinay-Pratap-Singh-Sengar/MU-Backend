import mongoose from "mongoose";

const connectDB = async() =>{
    try {
        const DB_OPTIONS = {
            dbName : "auth_user",
        }
        await mongoose.connect(process.env.DATABASE_URI, DB_OPTIONS);
        console.log("database connected successfully....");
    } catch (error) {
        console.log("error while connecting to the database");
    }
}

export default connectDB;
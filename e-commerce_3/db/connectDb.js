import mongoose from 'mongoose'

const connectDB = async() =>{
    try {
        const DB_OPTIONS = {
            dbName : "e-commerce-3"
        }
        await mongoose.connect("mongodb://localhost:27017",DB_OPTIONS);
        console.log("data base connected successfully...");
    } catch (error) {
        console.log("error while connecting database...");
    }
}

export default connectDB;
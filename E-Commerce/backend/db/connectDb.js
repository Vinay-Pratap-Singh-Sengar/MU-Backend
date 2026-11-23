import mongoose from "mongoose";

const connectDb = async() =>{
    try {
        const DB_OPTIONS = {
            dbName : "E-Commerce_4"
        }
        await mongoose.connect(process.env.MONGO_URI, DB_OPTIONS)
        console.log("database connected...")
    } catch (error) {
        console.log("error while connecting to the database")
    }
}


export default connectDb;

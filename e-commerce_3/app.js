import express from 'express';
import connectDB from './db/connectDb.js';
import userRoutes from './routes/user.js';
const app = express();
const PORT = 7070;

connectDB();
app.get('/', (req, res) =>{
    res.send("e-commerce server created");
})

// registration routes
app.use('/e-commerce/user' , userRoutes)

app.listen(PORT,() =>{
    console.log(`server is running at http://localhost:${PORT}`)
});
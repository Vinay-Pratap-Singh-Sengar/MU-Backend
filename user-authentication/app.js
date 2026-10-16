import express from 'express'
import connectDB from './db/connectDb.js';
import userRoute from './routes/auth.js';

const app = express();
const PORT = 7070;

// connecting database : 
connectDB();
app.use(express.json());
app.get('/',(req, res) => {
    res.send("user authentication server is ready...");
})
// attach all routes here : 
app.use('/auth/user', userRoute);

app.listen(PORT , () =>{
    console.log(`Server is running at http://localhost:${PORT}`)
})
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './db/connectDb.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/',(req,res) => {
    res.json('E-Commerce server is ready...')
})

app.use(express.json());
app.use(cors());

connectDb();

app.listen(PORT , ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})
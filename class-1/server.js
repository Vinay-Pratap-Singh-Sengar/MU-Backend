// // ============== SERVER CREATION USING HTTP MODULE ===========
// const http = require('http')

// const PORT = 6060
// const app = http.createServer((req, res) =>{
//     res.end("this is my first server");
// })

// app.listen(PORT,()=>{
//     console.log(`server is running at http://localhost:${PORT}`)
// })


// // ================ SERVER CREATION USING EXPRESS MODUE=========
// const express = require('express');

// const app = express();
// const PORT = 7070;
// app.get('/',(req, res) =>{
//     res.send("this is my second server created using express");
// })
// app.listen(PORT , () =>{
//     console.log(`server is running at http://localhost:${PORT}`)
// })

// // ================ SERVER CREATION USING ES-6 IMPORT ==========

import express from 'express'
import students from './routes/students.js';
const app = express(); //INSTANCE OF EXPRESS 
const PORT = 7060;

// const handler = (req, res) =>{
//     res.send("this is my second server created using express");
// }
// app.get('/',handler)

// students route
app.use('/',students)

// management route
app.get('/management',(req, res) => {
    res.send("deleaing with management")
})

app.post('/management',(req, res) => {
    res.send("create management data")
})

app.put('/management',(req, res) => {
    res.send("update management data")
})

app.patch('/management',(req, res)=>{
    res.send('partially update management data')
})

app.delete('/management',(req,res) =>{
    res.send('delete managements data')
})

// faculty route
app.get('/faculty',(req, res) => {
    res.send("dealing with faculty")
})

app.post('/faculty',(req, res) => {
    res.send("create faculty data")
})

app.put('/faculty',(req, res) => {
    res.send("update faculty data")
})

app.patch('/faculty',(req, res)=>{
    res.send('partially update faculty data')
})

app.delete('/faculty',(req,res) =>{
    res.send('delete faculty data')
})
app.listen(PORT , () =>{  
    console.log(`server is running at http://localhost:${PORT}`)
})



// WHAT IS HTTP MODULE ?
// WHAT ARE THE TYPES OF MODULE ?
// BUILT-IN MODULE - GIVE EXAMPLE ?
// USER-DEFINED MODULE - GIVE EXAMPLE ?
// THIRD PARTY MODULE - GIVE EXAMPLE ?
// DEFINE COMMON JS AND ES-6 APPROACT TO IMPORT AND EXPORT MODULES AND TELL THE DIFFERENCE ?

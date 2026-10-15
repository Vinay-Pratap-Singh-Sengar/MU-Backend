import express from 'express'

const router = express.Router();

router.get('/students',(req, res) => {
    res.send("this is my second server using express")
})

router.post('/students',(req, res) => {
    res.send("create student data")
})

router.put('/students',(req, res) => {
    res.send("update student data")
})

router.patch('/students',(req, res)=>{
    res.send('partially update student data')
})

router.delete('/students',(req,res) =>{
    res.send('delete students data')
})

export default router;
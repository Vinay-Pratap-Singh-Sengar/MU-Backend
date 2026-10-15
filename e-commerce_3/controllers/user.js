import userModel from "../models/User.js"

const register = async(req, res) =>{
    try {
        
        const new_user = await userModel.create({
            name : "vinay",
            email : "vinay@gmail.com",
            age : 28,
            password : "vinay@123"
        })

        return res.json({status : "successful" , message : "user created successfully" , user : new_user})

    } catch (error) {
        console.log("error while registering user")
    }
}

export default register;
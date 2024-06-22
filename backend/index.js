const express = require("express")
const cors = require('cors')
const User = require("./model/user.model")
const joi = require('joi')
const DB = require('./config/DB')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const privateKey = "Super@123"

const app = express()

app.use(cors({
    origin : "http://localhost:5173"
}))

app.use(express.json())


app.get('/blogs' , (req , res ) => {
    return res.json({ data : "data from backend" })
})

app.post('/user/login' , postLogin )

async function postLogin(req , res){
    console.log("git it")
    const { username , password } = req.body 
    console.log(req.body)

    // const userSchema = joi.object({
    //     username : joi.string().max(15).min(4) ,
    //     password : joi.string().max(18).min(6)
    // })   

    // const { error } = userSchema.validate(req.body)

    if(!username || !password){
        return res.status(400).json({ success : false , message : "missing input feilds" })
    }

    // returns the document with matching username else null
    const checkingUsername = await User.findOne({ username : username })

    // checking whether user same 
    console.log(checkingUsername)
    if(!checkingUsername){
        return res.status(400).json({ success : false , message : "username does'nt  exsist" })
    }
        
    const checkPassword = await bcrypt.compare(password , checkingUsername.password )
    console.log(checkPassword)
        
    if(!checkPassword){
        return res.status(400).json({ success : false , message : "password did not matched" })
    }

    const token = jwt.sign({ id : checkingUsername._id , username : username  } , privateKey )
    console.log(token)

    return res.status(200).json({ token })
}


app.listen(3000 , () => console.log('server started at 3000') )
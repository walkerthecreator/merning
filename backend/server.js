const express = require("express")
const joi = require('joi')

const app = express()

app.use(express.json())

const otpStore = {}
const usersDb = []

app.post('/' , (req , res) => {
    try{
        const { username , email , password , age  } = req.body

        const userSchema = joi.object({
            username : joi.string() ,
            email : joi.string().email() ,
            password : joi.string().max(18).min(6) ,
            age : joi.number().integer().min(18).max(100)
        })
    
        const validating = userSchema.validate(req.body)
        console.log(validating.error.message)

        if(validating.error){
            throw new Error(validating.error.message)
        }
    
        usersDb.push({ username , email , password , age })
        return res.json(usersDb)
    }
    catch(err){
        console.log(err)
        return res.json({ success : false , msg : err.message })
    }
})

app.get('/generate-otp' , (req , res) => {
    const { email } = req.query 
    const otpData = Math.round(Math.random() * 9999 ) 
    otpStore[email] = otpData
    console.log(otpStore)
    res.json({ "msg" : "generated otp" })
})

app.get('/verify' , (req , res) => {
    const { email , otp } = req.query
    if(otpStore[email]){
        if(otpStore[email] == otp){
            return res.json('changed password')
        }
        return res.json({ msg : "enter valid otp" })
    }
    return res.json({ msg : "please generate otp first" })
})

app.listen(3000)
const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/ecom')
let DB = mongoose.connection

DB.on("open" , ()=>{
    console.log('connected with database')
})

DB.on('error' , ()=>{
    console.log("OOPS something went wrong with MONGODB")
})
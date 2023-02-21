const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const bcrypt = require("bcryptjs")

const app = express();
require('dotenv').config()

const bcryptSalt = bcrypt.genSaltSync(8)

app.use(express.json())

app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173/',
}))
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL).then(()=>console.log('Connected'))

app.get("/test", (req,res)=>{
    res.send("text")
})

app.post("/register", async(req,res)=>{
    const {name,email,password} = req.body;
    const userDoc = await User.create({name,email,password:bcrypt.hashSync(password, bcryptSalt)})
    res.json(userDoc)
})

app.listen(4000,()=>{
    console.log("Listening to port")
});
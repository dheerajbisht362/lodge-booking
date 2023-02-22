const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
var cookieParser = require('cookie-parser')
const app = express();
require('dotenv').config()
const imageDownloader = require("image-downloader")

const bcryptSalt = bcrypt.genSaltSync(8)
const jwtSecret = "secretJWTtokenadsfdsf"

app.use(express.json())
app.use(cookieParser())
app.use('/uploads',express.static(__dirname + '/uploads'))
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
    try{
        const userDoc = await User.create({name,email,password:bcrypt.hashSync(password, bcryptSalt)})
        res.json(userDoc)
    }catch(err){
        res.status(422).json(err)
    }
})

app.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    try{
        const userDoc =  await User.findOne({email}).lean()
        if(userDoc){
            const passOk = bcrypt.compareSync(password, userDoc.password)
            if(passOk){
                jwt.sign({email: userDoc.email, id: userDoc._id}, jwtSecret, {}, (err, token)=>{
                    if(err) throw(err)
                    res.cookie("token", token).json(userDoc)
                })
            }else {
                res.status(422).json("Password not ok")
            }
        }else{
            res.json("Not found")
        }
    }catch(err){

    }
})

app.get("/profile", async(req,res)=>{
    try{  
        const {token} = req.cookies;
        if(token){
            jwt.verify(token, jwtSecret,{},async(err,userData)=>{
                if(err) throw(err)
                const {name, email,id} = await User.findById(userData.id);
                res.json({name, email,id}) 
            })
        }else{
            res.json(null)
        }
    }catch(err){
        res.status(401).send(err)
    }
})

app.post("/logout", async(req,res)=>{
    res.cookie('token', '').json(true)
})

app.post("/upload-by-link", async(req,res)=>{
    try{
        const {link} = req.body;
        const newName = "/photo" +Date.now() + '.jpg';
        await imageDownloader.image({
            url:link,
            dest: __dirname + "/uploads" + newName,
        })
        res.json(newName)
    }catch(err){
        console.log(err)
        res.status(422).json(err)
    }
})

app.listen(4000,()=>{
    console.log("Listening to port")
});
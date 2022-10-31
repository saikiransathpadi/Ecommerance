const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer")();
const userController = require("./user/routes/user");
const orderController= require("./user/routes/order");
const cartController = require("./user/routes/cart");
const itemController =require("./user/routes/item");
const app = express();
const cors = require("cors");
const Jwt = require("jsonwebtoken");
const uprotectedRoutes=["/user/login","/user/signup"]
require("dotenv").config();

// server
app.listen(3001, (err)=>{
    if (!err){
        console.log("server started at port 3001")

    }else{
        console.log(err)
    }
});
// body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(multer.array());
app.use(cors());

// app.use((req,res,next)=>{
//     const user=Jwt.verify(req.headers.authtoken,process.env.secertkey);
//     next()

// });


// Database Connection
mongoose.connect("mongodb://localhost/ecommerce",(data)=>{
    console.log("Succesfully connected to db")

},(err)=>{
    console.log(err)
})


app.get("/",(req,res)=>{
    res.send("Ecommerance Backend")
});

// middleware
app.use("/user",userController)
app.use("/order",orderController)
app.use("/cart",cartController)
app.use("/item",itemController)
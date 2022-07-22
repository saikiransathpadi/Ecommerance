const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer")();
const userController = require("./user/routes/user");
const orderController= require("./user/routes/order");
const app = express();

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


// Database Connection
mongoose.connect("mongodb://localhost/ecommerance",(data)=>{
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
const express =require("express");

const router = express.Router();

router.post("/signup",(req,res)=>{
    res.status(200).send("signup works")
})

router.post("/login",(req,res)=>{
    res.status(200).send("login works")
})

router.post("/logout",(req,res)=>{
    res.status(200).send("logout works")
})


module.exports = router;
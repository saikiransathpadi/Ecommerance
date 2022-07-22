const express = require("express")
const orderModal = require("../modals/order-modal")

const router = express.Router();

router.post("/add",(req,res)=>{
    orderModal.create(req.body).then((userB)=>{
            console.log(userB)
            res.status(200).json({message:"sucess",orderID:userB._id})
        }).catch((err)=>{
            console.log(err)
            res.status(400).json({message: err.message})
        })
})








module.exports= router;
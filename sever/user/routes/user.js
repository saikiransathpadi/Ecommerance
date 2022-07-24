const express =require("express");
const { $where } = require("../modals/signup-modal");
const signupModal =require("../modals/signup-modal")
const {checkExistingUser, generatePasswordHash} = require("./utility")
const bcrpyt = require("bcryptjs")
const Jwt = require("jsonwebtoken")


const router = express.Router();

router.post("/signup", async (req,res)=>{
    //console.log(req.body)
    if(await checkExistingUser (req.body.username)){
        res.status(400).send("username exists. Please try with different username");
    }else{
        let username= req.body.username;
        generatePasswordHash(req.body.password).then((passwordHash)=>{
            signupModal.create({username:req.body.username,phone_number:req.body.phone_number,
                            email_id: req.body.email_id,password: passwordHash}).then(()=>{
                                res.send(`${username} added succesfully`)
                            // res.status(200).json({
                            //     status: "success",
                            //     message: "Successfully added", username: username
                            // })
                        }).catch((err)=>{
                            //console.log(err)
                            res.status(400).send(err.message)
                        })
        })
    }
    
})

router.post("/login",(req,res)=>{
    signupModal.find({username: req.body.username}).then((userData)=>{
        //console.log(userData[0].password,req.body.password)
       // console.log(process.env.secertkey)
        if(userData.length){
            bcrpyt.compare(req.body.password,userData[0].password).then((val)=>{
                if(val){
                    const authToken = Jwt.sign(userData[0].username, process.env.secertkey);
                    res.status(200).send({authToken});
                }else{
                    res.status(400).send("Invalid password")
                }
            })
        }else{
            res.status(400).send("Unauthoised user")
        }

    })
});

router.post("/logout",(req,res)=>{
    res.status(200).send("logout works")
})


router.put("/updatepassword",(req,res)=>{
    signupModal.find({username: req.body.username}).then((user)=>{
        if(user.length){
            bcrpyt.compare(req.body.oldpassword,user[0].password).then((ismatch)=>{
                if(ismatch){
                    generatePasswordHash(req.body.newpassword).then((hashedpassword)=>{
                        signupModal.updateOne({username:req.body.username},{password: hashedpassword}).then(()=>{
                            res.status(200).send("passwod updated successfully");
                        }).catch((err)=>{
                            res.status(400).send(err)
                        })
                    })
                    
                }else{
                    res.status(400).send("oldpassword is incorrect")
                }
            })
        }else{
            res.status(400).send("Invaid user")
        }
    })

})


module.exports = router;
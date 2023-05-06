const {UserModel}=require("../models/user.model")

const express=require("express")

const userRouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

 userRouter.post("/register",(req,res)=>{
    const {name,email,password,isAdmin}=req.body

    try {
        bcrypt.hash(password,5,async function(err,hash){
         await UserModel.create({name,email,password:hash,isAdmin})
         res.status(201).send({"msg":"user created"})
        })
    } catch (error) {
        res.status(400).send({"msg":error})
        
    }
 })

 userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body 

    try {
        const user=await UserModel.findOne({email})

        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(result){
                    var token=jwt.sign({userID:user._id},"secret")
                    res.status(201).send({token})
                }else{
                    res.status(400).send({"msg":"Unauthorised"})
                }
            })
        }
    } catch (error) {
        res.status(400).send({"msg":"user not found"})
    }
 })

 module.exports={userRouter}
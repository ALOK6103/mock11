const express=require("express")
const {BookModel}=require("../models/book.model")
const booksRouter=express.Router()
const {isAuth}=require("../middleware/auth.middleware")
booksRouter.get("/books",async(req,res)=>{
     try {
        const books=await BookModel.find()
        res.status(200).send({books})
     } catch (error) {
        res.status(400).send({"msg":"Not found"})
        
     }
})

booksRouter.post("/books",isAuth,async(req,res)=>{
    const {title,author,category,price,quantity}=req.body
    try {
       await BookModel.create({title,author,category,price,quantity})
       res.status(201).send({"msg":"book added"})
    } catch (error) {
       res.status(400).send({"msg":"Not found"})
       
    }
})

booksRouter.put("/books/:id",isAuth,async(req,res)=>{
    const {id}=req.params 

    try {
        await BookModel.findByIdAndUpdate({_id:id},req.body)
        res.status(204).send({"msg":"Book updated"})
    } catch (error) {
        res.status(400).send({"msg":error})
        
    }
})

booksRouter.delete("/books/:id",async(req,res)=>{
    const {id}=req.params 

    try {
        await BookModel.findByIdAndDelete({_id:id},req.body)
        res.status(204).send({"msg":"Book deleted"})
    } catch (error) {
        res.status(400).send({"msg":error})
        
    }
})

booksRouter.get("/books?author=corey&category=fiction",async(req,res)=>{
    const {author,category}=req.query

    const books1=await BookModel.find({userID:req.body.userID})

    let filtered=books1.filter((el)=>{
         if(el.category==category && el.author==author){
          return el
        }
    })

    res.status(200).send({filtered})
})

booksRouter.get("/books?category=fiction",async(req,res)=>{
    const {category}=req.query

    const books=await BookModel.find({userID:req.body.userID})

    let filtered=books.filter((el)=>{
         return el.category==category
    })

    res.status(200).send({filtered})
})


// {
//     "title": "harry 2",
//      "author": "corey",
//      "category": "fiction",
//      "price": 348,
//     "quantity": 2
//    }
   

module.exports={booksRouter}
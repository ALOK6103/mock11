const express=require("express")
const {connetion}=require("./db")
const app=express()
app.use(express.json())
const {userRouter}=require("./routes/user.routes")
const {booksRouter}=require("./routes/books.routes")
const {isAuth}=require("./middleware/auth.middleware")
app.get("/",async(req,res)=>{
    res.send("Home")
})

app.use("/api",userRouter)
// app.use(isAuth)
app.use("/api",booksRouter)


app.listen(process.env.PORT,async(req,res)=>{
    try {
        await connetion 
    console.log("connected")
    } catch (error) {
        console.log(error)
    }
})
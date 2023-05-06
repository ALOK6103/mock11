var jwt=require("jsonwebtoken")

function isAuth(req,res,next){
    const token=req.headers.authorization.split(" ")[1]

    if(token){
        var decoded=jwt.verify(token,"secret")

        if(decoded){
            req.body.userID=decoded.userID
            
            next()
        }else{
            res.status(400).send({"msg":"something wrong"})
        }
    }else{
        res.status(400).send({"msg":"Not Authorised"})

    }
}

module.exports={isAuth}
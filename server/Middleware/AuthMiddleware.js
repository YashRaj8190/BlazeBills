const jwt=require('jsonwebtoken');
async function authenticate(req,res,next){
    let token=req.headers.authorization&&req.headers.authorization.split(" ")[1];
    console.log(token);
    if(!token){
        return res.status(401).json({message:"unauthorized user"});
    }
    
    jwt.verify(token,process.env.SECRET_KEY,(err,decodedToken)=>{
        if(err){
            console.log("unauthorized");
            return res.status(401).json({message:"unauthorized user",err});
        }
        else{
            next();
        }
        
    });
}
module.exports=authenticate;
const User=require('../models/UserSchema');
const bcrypt=require('bcryptjs');
class Authcontroller{
    static userSignUp=async(req,res)=>{
        try {
            
            if(!req.body.password||!req.body.confirmPassword){
                res.status(500).json({message:'all fields are required'}); 
            }
            else if(req.body.password!=req.body.confirmPassword){
                res.status(500).json({message:'password and confirmPassword did not match'});
            }
            else{
                const newUser = await User.create(req.body);
                res.status(200).json({message:"successfully signup",newUser})
                // Respond with the created user and HTTP status 201 (Created)
            }
            } catch (error) {
                
               if(error.code===11000){
                if(error.keyPattern.email==1){
                    res.status(500).json({message:`email is already existed`})
                }
                else{
                    res.status(500).json({message:` phone is already existed`})
                }
               }
               else{
                res.status(500).json(error.message); // Handle errors with an error response
               }
           
          }
    };
    static userLogin=async(req,res,next)=>{
        const userEmail=req.body.email;
    
    const isUserPresent= await User.findOne({email:userEmail});
    
    if(isUserPresent==null){
        
        res.status(500).json({message:"invalid credentials"});
    }
    else{
        const userpassword=req.body.password;
        const dbpassword=isUserPresent.password;
        const check= await bcrypt.compare(userpassword,dbpassword);
        if(check){
            res.json({message:"you have been login successfully",userdetails:isUserPresent});
            next();
        }
        else{
            res.status(501).json({message:"invalid credential"});
        }
    }
    };
}
module.exports= Authcontroller;
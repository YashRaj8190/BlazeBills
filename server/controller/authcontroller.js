require('dotenv').config();
const User=require('../models/UserSchema');
const bcrypt=require('bcryptjs');
const nodemailer=require('nodemailer')
const otpGenerator=require('otp-generator');
const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., Gmail
    auth: {
      user: process.env.Secret_User,
      pass: process.env.Secret_Password,
    },
  });
  let otpCache={};
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
    //send a otp that will expire in one minute
       static otpSender= async(req,res)=>{
        const {email}=req.body;
        //generate otp use otp-generator liberary
         const otp=otpGenerator.generate(6,{upperCaseAlphabets:false,specialChars:false,lowerCaseAlphabets:false});
         const otpExpirationTime = Date.now() + 1* 60 * 1000; // 5 minutes in milliseconds
    
         otpCache[email] = { otp, expirationTime: otpExpirationTime };
         res.status(200).json({message:"otp generated successfully"});
         //data of email that will be send to user
         const mailOptions = {
            from: 'expenseTracker@gmail.com',
            to:email,
            subject:"your otp code",
            text:`Your otp code is :${otp}`,
           
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              res.status(500).json({ message: 'Email not sent' });
            } else {
              console.log('Email sent: ' + info.response);
              res.json({ message: 'Email sent successfully' });
            }
          });
      };
      //veryfiy the otp 
      static verifyOtp=async(req,res)=>{
        const {email,enteredOTP}=req.body;
        console.log(req.body);
        
        const storedOTPData=otpCache[email];
       console.log(storedOTPData);
        if(!storedOTPData){
            return res.status(400).json({message:"otp not found"});
        }
        const {otp , expirationTime } = storedOTPData;
      if (Date.now() > expirationTime) {
        delete otpCache[email];
        return res.status(400).json({ message: "OTP has expired" });
      }
        if(enteredOTP===otp){
            const updatedUser=await User.findOneAndUpdate({email:email},{$set:{isVerified:true}},{new:true});
          //delete the otp after the email verification
            delete otpCache[email];
            res.status(200).json({message:'Otp verified successfully',updatedUser});
        }
        else{
            console.log(enteredOTP);
            console.log(otp);
            res.status(400).json({message:"otp verification failed"});
        }
        
      };
      //update the users password
      static resetPassword=async(req,res)=>{
        console.log(req.body);
        try{
          const password=await bcrypt.hash(req.body.password,10);
          await User.findOneAndUpdate({email:req.body.email},{$set:{password:password}});
          res.status(200).json("password updated successfully");
        }
        catch(err){
          res.status(500).json("envalid email details");
        }
      };
    
}
module.exports= Authcontroller;
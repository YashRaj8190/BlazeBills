const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const validator =require('validator');
//function to check whether a password is  strong password or not
function isStrongPassword(value) {
    const minLength = 8; 
    const hasUppercase = /[A-Z]/.test(value); 
    const hasLowercase = /[a-z]/.test(value); 
    const hasDigit = /[0-9]/.test(value); 
    const hasSpecialChar = /[!@#$%^&*_]/.test(value); 
    return (
      value.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar
    );
  }
  function isValidName(value){
    const minLength = 3; 
    const hasDigit = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*+=-_?>.<,"':;]/.test(value); 
    return (
        value.length >= minLength &&
        (!hasDigit) &&
        (!hasSpecialChar)
      );

  }
// Define a User schema having name , password ,confirmpassword,phone and email fields
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required:[true,message="all fields are required"],
    trim:true,
    validate: {
        validator: isValidName,
        message:
          'Name must be only lattin character(a to z OR A to Z) character.',
      },
  },
  password: {
    type: String,
    required:[true,message="all fields are required"],
    validate: {
      validator: isStrongPassword,
      message:
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
    },
  },
  confirmPassword: {
    type: String,
    required:[true,message="all fields are required"],
    
  },
  phone: {
    type: String,
    required:[true,message="all fields are required"],
    unique: [true,message="email or phone number is not unique"],
    validate: {
        validator: (value) => {
          return validator.isMobilePhone(value, 'any', { strictMode: false }) && value.length === 10;
        },
        message: 'Invalid or non-10-digit phone number.',
      },
  },
  email: {
    type: String,
    required:[true,message="all fields are required"],
    unique: [true,message="email or phone number is not unique"],
     validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: 'Invalid email address.',
    },
  },
},{timestamps:true});

userSchema.pre('save',async function(next){
  if(!this.isModified('password'))return next();
  this.password=await bcrypt.hash(this.password,10);
  this.confirmPassword=undefined;
  next();
 })
const User = mongoose.model('User', userSchema);

module.exports = User;

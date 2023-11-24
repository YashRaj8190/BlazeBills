const mongoose=require('mongoose');
function dataBaseConnection(){
mongoose.connect('mongodb://127.0.0.1:27017/extrack')
.then(()=>{console.log("connection established successfully")})
.catch((err)=>{console.log("error occured",err)});
}
module.exports=dataBaseConnection;
const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const database =require('./database');
const authrouter=require('./routers/approuters');
const app=express();
const User=require('./models/UserSchema');
app.use(express.json());
app.use(cors());
const port=5000;
database();
app.use('/',authrouter);

  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
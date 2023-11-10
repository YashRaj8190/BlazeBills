const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const database =require('./database');
const authrouter=require('./routers/approuters');
const app=express();
const User=require('./models/UserSchema');
const transectionrouter=require('./routers/transactionrouter');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const port=5000;
database();
app.use('/',authrouter);
app.use('/',transectionrouter);

  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
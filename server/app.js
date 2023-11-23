const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const database =require('./database');
const authrouter=require('./routers/approuters');
const app=express();
const User=require('./models/UserSchema');
const transactionrouter=require('./routers/transactionrouter');
const grouptransactionrouter=require('./routers/grouptransactionrouter');
const grouprouter=require('./routers/groupRouter');
const commentrouter=require('./routers/commentrouter');
const sendEmailRouter=require('./routers/sendEmailRouter');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const port=5000;
database();
app.use('/',authrouter);
app.use('/',transactionrouter);
app.use('/',grouptransactionrouter);
app.use('/',grouprouter);
app.use('/',commentrouter);
app.use('/',sendEmailRouter);

  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
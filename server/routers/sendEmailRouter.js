const express=require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.Secret_User,
    pass: process.env.Secret_Password,
  }
});

async function sendEmail(to) {
    const mailOptions = {
      from: 'blazebills247@gmail.com',
      to: to,
      subject: "Invitation",
      text: "Please check our website"
    };
  
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent to : ' + info.response);
    } catch (error) {
      console.error(error);
      throw error; // Propagate the error to the caller
    }
  }
  const authenticate=require('../Middleware/AuthMiddleware');
router.post('/user/send-email',authenticate, async (req, res) => {
    const toEmail = req.body.toEmail;
    try {
      await sendEmail(toEmail);
      res.send('Email sent successfully!');
    } catch (error) {
      res.status(500).send('Error sending email');
    }
});

module.exports = router;
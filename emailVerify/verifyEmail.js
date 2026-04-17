const nodemailer = require('nodemailer');
require('dotenv').config();
const frontendURL = process.env.FRONTEND_URL.replace(/\/$/, '');


const verifyEmail=(token, email)=>{
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use 'hotmail', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASS  // app password if using Gmail
    }
});
const mailConfiguration = {
            from: `"KMart :" <${process.env.EMAIL_USER}>`,
            to:       email,
            subject:  `Email Verification`,
            text: `Click this link to verify your email: ${frontendURL}/verify/${token}`
 };
 transporter.sendMail(mailConfiguration, function(error,info){
    if(error){throw Error(error)}
    console.log("Email Sent Successfully");
    console.log(info);
 })
}


module.exports = verifyEmail;
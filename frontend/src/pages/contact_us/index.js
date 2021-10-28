var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
require('dotenv').config();
var cors = require('cors');
const creds = require('./config');
var app= express();
app.use(express.json());
const port= 4000;

  app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io', 
    port: 2525,
    auth: {
      user: 'f76615441a7641',
      pass: '2448b6e186d6c9'
    }
  });

 


  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

app.post('/contact_us', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var subject = req.body.subject
    var message = req.body.message
  
    var mail = {
      from: name,
      to: 'jackzhan@usc.edu',//my regular email I used to sign up to mailtrap
      subject: subject,
      text: message
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log('failed', err);
        res.json({
          status: 'fail'
        })
      } else {
        console.log('successful');
        res.json({
         status: 'success'
        })
      }
    })
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })



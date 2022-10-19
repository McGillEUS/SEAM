const express = require('express')
const app = express()
const port = 3000
const gapi = process.env.GAPI
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser')
const https = require('https')
const fs = require('fs')
const path = require('path')

app.use(bodyParser());
/*app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   if ('OPTIONS' === req.method) {
      	next();
    }
});*/

var transporter = nodemailer.createTransport({
 service: 'gmail',
 auth: {
        user: process.env.seamemail,
        pass: process.env.seampassword
    }
});

function sendEmail(reqBody){
	console.log(reqBody)
	var emailSubject = "[From Website] " + reqBody['subject']
	var emailContent = '<p>' + reqBody['body'] + '</p>'
	var mailOptions = {
		from: "test.user@mcgilleus.ca",
		to: "seam.vpcomm@mcgilleus.ca",
		subject: emailSubject,
		generateTextFromHTML: true,
		html: emailContent
	}
	console.log(mailOptions)
	return transporter.sendMail(mailOptions, (error, response) => {
		error ? console.log(error) : console.log(response);
		smtpTransport.close();
	});
}

app.listen(port, () => console.log(`Email app listening on port ${port}!`))

app.get('/ping', (req, res) => res.send('pong\n'))

app.post('/email', (req, res) => res.send(sendEmail(req.body)))


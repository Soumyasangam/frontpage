var express= require('express');
var app = express();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
var nodemailer = require('nodemailer');
let db = new sqlite3.Database('studentdb');
var http=require('http');
var server = http.Server(app);
app.use(express.static('static'));
app.use(express.json());


app.get('/',function(req,res){
    res.sendFile(__dirname+"/"+"home.html")
});
app.get('/createacc',function(req,res){
    console.log("create account page");
    res.sendFile(__dirname+"/"+"createacc.html");
app.get('/deleteacc',function(req,res){
    console.log("delete account page");
    res.sendFile(__dirname+"/"+"deleteacc.html");
    
});

app.get('/post_createacc',function(req,res){
    console.log("post register function");
     let sql = `insert into student values("${req.query.name}","${req.query.an}","${req.query.gender}","${req.query.email}","${req.query.actype}",${req.query.age})`;
 
	db.all(sql, [], (err, rows) => {
	  if (err) {
		throw err;
	  }
	  rows.forEach((row) => {
		console.log(row.name);
	  });
	});
	
	var transporter = nodemailer.createTransport({
	  service: 'yahoo',
	  auth: {
		user: 'email@yahoo.com',
		pass: 'pass'
	  }
	});
	
app.get('/post_deleteacc',function(req,res){
    console.log("post register function");
     let sql = `delete from student where usn="${req.query.an}";
 
	db.all(sql, [], (err, rows) => {
	  if (err) {
		throw err;
	  }
	  rows.forEach((row) => {
		console.log(row.name);
	  });
	});
	
	var transporter = nodemailer.createTransport({
	  service: 'yahoo',
	  auth: {
		user: 'email@yahoo.com',
		pass: 'pass'
	  }
	});





	var mailOptions = {
	  from: 'email@yahoo.com',
	  to: req.query.email,
	  subject: 'CreateAccount',
	  text: 'you have successfullly createded\nstay tuned for updates'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email sent: ' + info.response);
	  }
	});
	res.status(200).send("Account Creatation Successful");
	
     //console.log(response);
});

server.listen(process.env.PORT,function(){
    console.log("We have started our server on port 3000");
	//res.sendFile(__dirname+"/"+"home.html")
	//app.get('/', (req, res) => res.render('home.html'))
});

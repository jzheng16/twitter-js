const express = require('express');
const app = express();

const PORT = 3000;

var ourRandomArray = [];
/*const http = require('http');

const server = http.createServer();*/



app.all('*',function(req,res, next){
	console.log(req.method, 'this is the verb');
	console.log(req.originalUrl, 'this is the route originalUrl');
	// console.log(req);

	// console.log(req.params);
	next();
})

app.use('/joey/', function(req,res,next){
	console.log('this is the middleware ONLY for /joey');
	next();
})
app.post('/joey', function(req, res){
	console.log('someone is trying to post into /joey');
	res.send('you tried posting something into /joey');

})



app.listen(PORT, function(){
  console.log("Server listening..this is what you get when you open your server");
})

app.get('/', function(req,res){
  console.log("WELCOME MESSAGE this is what i get when someone requests");
  res.send('HELLO');
})

app.get('/joey', function(req, res){
	res.send('sup joey, i got rid of the object');
})



app.get('/news', function(req, res){
	console.log('someone requested the /news');
	res.send('good job, you accessed /news');
})


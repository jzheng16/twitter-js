const express = require('express');
const app = express();
const PORT = 3000;




//Nunjuck render code
const nunjucks = require('nunjucks');
app.set('view engine', 'html');        //Sets view engine to html default
app.engine('html', nunjucks.render);		//Tells our app that we are using nunjuck to render html
nunjucks.configure('views', {noCache: true});    //tells our app where our templates are

//Body-parser parses the request body which is very messy
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

//Static content should be put in a public folder so that you can access it easily without creating a route for each of them
app.use(express.static(__dirname + '/public'));

//Use the routes defined in our routes module. Makes our code cleaner.
const routes = require('./routes/');
app.use('/', routes);

//Middleware for all incoming requests
app.all('*', function(req, res, next){
  console.log('Header: ', req.headers)
	console.log('Verb: ', req.method );
	console.log('Route: ', req.originalUrl);
	next();
})

app.listen(PORT, function(){
  console.log('Server listening..this is what you get when you open your server');
})


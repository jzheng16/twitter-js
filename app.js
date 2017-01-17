const express = require('express');
const app = express();
const PORT = 3000;

const tweetBank = require('./twitter-js/tweetBank.js');

//Nunjuck render code
const nunjucks = require('nunjucks');
app.set('view engine', 'html');        //Sets view engine to html default
app.engine('html', nunjucks.render);		//Tells our app that we are using nunjuck to render html
nunjucks.configure('views', {noCache: true});    //tells our app where our templates are
var locals = {
    title: 'An Example',
    people: tweetBank.list()


};



const routes = require('./routes/');
app.use('/', routes);

app.all('*', function(req, res, next){

	console.log(req.method, 'this is the verb');
	console.log(req.originalUrl, 'this is the route originalUrl');
	// console.log(req.params);
	next();
})


app.listen(PORT, function(){
  console.log('Server listening..this is what you get when you open your server');
})

app.use('/joey/', function(req, res, next){
	console.log('this is the middleware ONLY for /joey');
	next();
})

app.get('/nimit', function(req, res){
  tweetBank.add('Nimit Something', 'empty tweet');
  console.log(tweetBank.find('Nimit Something'));
	res.render( 'index', locals );

})

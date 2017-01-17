const express = require('express');
const app = express();
const PORT = 3000;

//Nunjuck render code
const nunjucks = require('nunjucks');
app.set('view engine', 'html');        //Sets view engine to html default
app.engine('html', nunjucks.render);		//Tells our app that we are using nunjuck to render html
nunjucks.configure('views', {noCache: true});    //tells our app where our templates are
var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};

app.all('*', function(req, res, next){

	console.log(req.method, 'this is the verb');
	console.log(req.originalUrl, 'this is the route originalUrl');
	// console.log(req.params);
	next();
})

app.use('/joey/', function(req, res, next){
	console.log('this is the middleware ONLY for /joey');
	next();
})
app.post('/joey', function(req, res){
	console.log('someone is trying to post into /joey');
	res.send('you tried posting something into /joey');

})


app.listen(PORT, function(){
  console.log('Server listening..this is what you get when you open your server');
})

app.get('/', function(req, res){
  console.log('WELCOME MESSAGE this is what i get when someone requests');
  res.send('HELLO');
})

app.get('/joey', function(req, res){
	res.send('sup joey, i got rid of the object');
})


app.get('/news', function(req, res){
	console.log('someone requested the /news');
	res.send('good job, you accessed /news');
})


app.get('/eric', function(req, res){

	res.render( 'index', locals );

})

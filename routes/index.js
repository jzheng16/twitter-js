const express = require('express');
const router = express.Router();
const client = require('../db/index');

router.get('/', function (req, res) {

  client.query('SELECT tweets.id, users.name, tweets.content FROM users INNER JOIN tweets ON users.id = tweets.user_id', function (err, result) {
  if (err) return next(err); // pass errors to Express
  var tweets = result.rows;
  res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
});

});

router.get('/users/:name', function(req, res){


  client.query('SELECT users.name, tweets.content FROM users INNER JOIN tweets ON users.id = tweets.user_id WHERE name = $1', [req.params.name], function(err, result){
    if (err) return err;
    var tweets = result.rows;
    res.render('index', {title: 'Twitter.js', tweets: tweets});
  });

});


router.get('/tweets/:id', function(req, res){

client.query('SELECT tweets.id, users.name, tweets.content FROM users INNER JOIN tweets ON users.id = tweets.user_id WHERE tweets.id = $1', [+req.params.id], function(err, result){
    if (err) return err;
    var tweets = result.rows;
    res.render('index', {title: 'Twitter.js', tweets: tweets});
  });
});

router.post('/tweets',  function (req, res){

  client.query('SELECT users.id, users.name, tweets.content FROM users INNER JOIN tweets ON users.id = tweets.user_id WHERE name = $1', [req.body.name], function(err, result){
    if (err) return err;
    var tweets = result.rows;

    if (tweets.length === 0){
      client.query('INSERT INTO users (name, picture_url) VALUES ($1, null) RETURNING users.id', [req.body.name], function(err, result){
        if (err) return err;
        var id = result.rows[0].id;
        client.query('INSERT INTO tweets (user_id, content) VALUES ($1, $2) RETURNING *', [id, req.body.text], function(err, result){
          if (err) return err;
        });
      });
    } else {
      client.query('INSERT INTO tweets (user_id, content) VALUES ($1, $2) RETURNING *', [tweets[0].id, req.body.text], function(err, result){
        if (err) return err;
      })
    }
  });

  res.redirect('/');
})


module.exports = router;

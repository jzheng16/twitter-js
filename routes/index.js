const express = require('express');
const router = express.Router();
const client = require('../db/index');


// could use one line instead: const router = require('express').Router();
const tweetBank = require('../twitter-js/tweetBank.js');




router.get('/', function (req, res) {

  client.query('SELECT tweets.id, users.name, tweets.content FROM users INNER JOIN tweets ON users.id = tweets.user_id', function (err, result) {
  if (err) return next(err); // pass errors to Express
  var tweets = result.rows;
  console.log("========", tweets);
  res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
});

  // let tweets = tweetBank.list();

  // var local = {tweets: tweets,
  //               showForm: true
  // }
  // res.render( 'index', local );
});

router.get('/users/:name', function(req, res){


  client.query('SELECT users.name, tweets.content FROM users INNER JOIN tweets ON users.id = tweets.user_id WHERE name = $1', [req.params.name], function(err, result){
    if (err) return err;
    var tweets = result.rows;

    res.render('index', {title: 'Twitter.js', tweets: tweets});
  });

  // var ownTweets = tweetBank.find({name: req.params.name});

  // var local = {
  //   tweets: ownTweets
  // }
  // res.render('index', local);
});


router.get('/tweets/:id', function(req, res){

client.query('SELECT tweets.id, users.name, tweets.content FROM users INNER JOIN tweets ON users.id = tweets.user_id WHERE tweets.id = $1', [+req.params.id], function(err, result){
    if (err) return err;
    var tweets = result.rows;



    res.render('index', {title: 'Twitter.js', tweets: tweets});
  });
});



  // var singleTweet = tweetBank.find({id: parseInt(req.params.id, 10)});
  // res.render('index', {tweets: singleTweet})

// });

router.post('/tweets',  function (req, res){

//   client.query('INSERT INTO tweets (user_id, content) VALUES () function(err, result){
//     if (err) return err;
//     var tweets = result.rows;
//     console.log("TWEETS ", tweets[0].id);


//     res.render('index', {title: 'Twitter.js', tweets: tweets[0]});
//   });
// });

  // var name = req.body.name;
  // var text = req.body.text;
  // tweetBank.add(name, text);
  res.redirect('/');
})


module.exports = router;

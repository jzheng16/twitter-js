const express = require('express');
const router = express.Router();

const path = require('path');
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../twitter-js/tweetBank.js');


router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  console.log(tweets);
  var local = {tweets: tweets}
  res.render( 'index', local );
});

router.get('/stylesheets/style.css', function(req, res){
  res.sendFile('/Users/me/Workshops/twitter/views/layout.html');
});

router.get('/users/:name', function(req, res){

  var ownTweets = tweetBank.find({name: req.params.name});

  var local = {
    tweets: ownTweets,

  }
  res.render('index', local);
});


router.get('/tweets/:id', function(req, res){

  console.log("Tweets: ", tweetBank.list());
  console.log(typeof req.params.id);
  var singleTweet = tweetBank.find({id: parseInt(req.params.id,10)});
  console.log(singleTweet);
  res.render('index', {tweets: singleTweet});

})


module.exports = router;

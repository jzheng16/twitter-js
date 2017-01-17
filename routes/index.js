const express = require('express');
const router = express.Router();


// could use one line instead: const router = require('express').Router();
const tweetBank = require('../twitter-js/tweetBank.js');


router.get('/', function (req, res) {
  let tweets = tweetBank.list();

  var local = {tweets: tweets,
                showForm: true
  }
  res.render( 'index', local );
});


router.get('/users/:name', function(req, res){

  var ownTweets = tweetBank.find({name: req.params.name});

  var local = {
    tweets: ownTweets
  }
  res.render('index', local);
});


router.get('/tweets/:id', function(req, res){

  var singleTweet = tweetBank.find({id: parseInt(req.params.id, 10)});
  res.render('index', {tweets: singleTweet})

})

router.post('/tweets',  function (req, res){
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
})


module.exports = router;

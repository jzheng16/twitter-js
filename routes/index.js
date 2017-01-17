const express = require('express');
const router = express.Router();

const path = require('path');
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../twitter-js/tweetBank.js');


router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

router.get('/stylesheets/style.css', function(req, res){
  res.sendFile('/Users/me/Workshops/twitter/views/layout.html');
});



module.exports = router;

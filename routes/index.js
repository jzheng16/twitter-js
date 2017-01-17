const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../twitter-js/tweetBank.js');
var locals = {
    title: 'An Example',
    people: tweetBank.list()


};

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', locals );
});

module.exports = router;
const express = require('express');
const app = express();

const PORT = 3000;
/*const http = require('http');

const server = http.createServer();*/
app.listen(PORT, function(){
  console.log("Server listening");
})

app.get('/', function(req,res){
  console.log("WELCOME MESSAGE");
  res.send('HELLO');
})



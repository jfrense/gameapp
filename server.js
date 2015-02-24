var express = require('express');
var  games = require('./routes/games');
var path = require('path');
var app = express();

app.use(express.static(__dirname + '/public'));


app.get('/api/games', games.findData);
//app.get('/app.js', function(req,res) {
//  res.sendFile(__dirname + '/app.js');
//  });
// send all other requests to index.html page
app.get('*', function(req,res) {
  res.sendFile(__dirname + '/public/index.html');
  });


app.listen(3000);
console.log('Listening on port 3000..');

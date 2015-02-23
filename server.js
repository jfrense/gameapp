var express = require('express');
    games = require('./routes/games');

var app = express();



app.get('/api/games', games.findData);


app.listen(3000);
console.log('Listening on port 3000..');

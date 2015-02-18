var http = require("http");
var url = require("url");
var path = require("path");
var mongo = require("mongodb");

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('gamedb', server);
var connection = db.open(function(err, db) {

  if(!err) {
  console.log("Connected to gameapp database");
  db.collection('games',{strict: true},function(err, collection){

    if(err) {
      console.log("cant connect to db");
    }


  });


}

});

 function findAll(req, res){
  db.collection('games', function(err, collection){
   collection.find().toArray(function(err,items){
      var result = JSON.stringify(items);
      res.write(result);
      res.end('\n\nEnd Request\n');
    });

});

};

http.createServer(function (req, res) {

  if(req.url == "/games" & req.method == "GET"){
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    findAll(req, res);


    //res.end('end request\n');
  }
else {
  res.writeHead(200, {'Content-Type' : 'text/plain'});
  res.end('HI\n');
}

}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');

var http = require("http");
var url = require("url");
var path = require("path");
var mongo = require("mongodb");


//establishing mongodb database server
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

 function findData(req, res){
   db.collection('games', function(err, collection){
     var object = url.parse(req.url,true).query;
     for(var key in object){
       if(Number.isNaN(parseInt(object[key])))
       console.log("Invalid value in key:value object. It must be a number");

    else  object[key] = parseInt(object[key]);

   }
    collection.find(object).limit(10).toArray(function(err,items){
       var result = JSON.stringify(items);
       res.write(result);
       res.end('\n\nEnd Request\n');
    });

});

};


//var prefix = "api";

http.createServer(function (req, res) {
  var call = url.parse(req.url).pathname;
    if(call == "/api/games" & req.method == "GET"){
      res.writeHead(200, {'Content-Type' : 'text/plain'});
      findData(req, res);
      }

else {
  res.writeHead(200, {'Content-Type' : 'text/plain'});
  res.end('HI\n');



}

}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');

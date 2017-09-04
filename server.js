var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('consentDB', ['consentDB']);

app.use(express.static(__dirname + "/public"));

app.get('/consentDB', function(req, res) {
  console.log("Got it");
  
  db.consentDB.find(function(err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.listen(3000);
console.log("Server running on port 3000");

var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use(express.static('public'));

var server = app.listen(3000, function(){
  console.log("App listening at http://localhost:3000");
})

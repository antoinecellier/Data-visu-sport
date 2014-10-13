var express = require('express');
var app = express();
var server = require('http').createServer(app);


app.use('/', express.static(__dirname + '/'));

module.exports = app.listen(8080, function() {
  console.log("Express server listening on port " + app.get('port'));
});


app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

var express = require('express');
var app = express();
var server = require('http').createServer(app);

var port_number = server.listen(process.env.PORT || 3000);

app.use('/', express.static(__dirname + '/'));

module.exports = app.listen(port_number, function() {
	console.log("Express server listening on port " + app.get('port'));
});

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});
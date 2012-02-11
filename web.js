var express = require('express'),
	tropowebapi = require('tropo-webapi'),
	tropo = new tropowebapi.TropoWebAPI();

var app = express.createServer(express.logger());

app.get('/', function(req, response) {
  response.send('hello world');
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Listening on " + port);
})
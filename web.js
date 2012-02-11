// requires
var express = require('express'),
  tropowebapi = require('tropo-webapi');

// setup google data api
var gClient = '599070097566.apps.googleusercontent.com',
  gSecret = 'N9LYDcK_KkGECvd4nzVQEqs_',
  gScope = 'https://spreadsheets.google.com/feeds',
  gRedirect = 'http://sms2gdocs.herokuapp.com/oauth2callback';
var gdata = require('gdata-js')(gClient, gSecret, gRedirect);

var tropo = new tropowebapi.TropoWebAPI();

var app = express.createServer(express.logger());

app.get('/', function(req, res) {
  gdata.getAccessToken(gScope, req, res, function(err, token){
  	if (err) {
  		console.error('oh noes!', err);
  		res.writeHead(500);
  		res.end('error: ' + JSON.stringify(err));
  	} else {
  		res.send('token');
  	}
  });
});

app.get('/oauth2callback', function(req, res){
	res.send('SMS coming soon');
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Listening on " + port);
})
// requires
var express = require('express'),
  tropowebapi = require('tropo-webapi'),
  fs = require('fs');

// setup google data api
var gClient = '599070097566.apps.googleusercontent.com',
  gSecret = 'N9LYDcK_KkGECvd4nzVQEqs_',
  gScope = 'https://spreadsheets.google.com/feeds',
  gRedirect = 'http://sms2gdocs.herokuapp.com/';
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
  		console.log(token);
  		fs.writeFileSync('token',token.access_token);
  	}
  });
});

app.get('/oauth2callback', function(req, res){
	gdata.getFeed('https://spreadsheets.google.com/feeds/spreadsheets/private/full', {'max-results': 3}, 
	function(err, feed) {
		res.writeHead(200);
		for(var i in feed.feed.entry) {
			res.write(JSON.stringify(feed.feed.entry[i]));
			res.write('\n\n');	
		}
		res.end();
	});
});

app.get('/sms.json', function(req, res){
  console.log("SMS REQUEST RECEIVED");
  console.log(JSON.stringify(req));
  res.send(JSON.stringify(req));
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Listening on " + port);
})
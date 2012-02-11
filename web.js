var express = require('express');
tropowebapi = require('tropo-webapi');

var tropo = new tropowebapi.TropoWebAPI();

var gClient = '599070097566.apps.googleusercontent.com';
var gSecret = 'N9LYDcK_KkGECvd4nzVQEqs_';
var gRedirect = 'http://sms2gdocs.herokuapp.com/oauth2callback';

var app = express.createServer(express.logger());

app.get('/', function(req, response) {
  response.send('hello world');
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Listening on " + port);
})
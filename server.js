var tropowebapi = require('tropo-webapi');
var sys = require('sys');
var tropo = new tropowebapi.TropoWebAPI();
tropo.say("Hello, World.");
sys.puts(tropowebapi.TropoJSON(tropo));

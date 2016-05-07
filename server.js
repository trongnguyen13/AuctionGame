// definitions and requires
var bodyParser = require('body-parser');
var cors = require('cors'); 
var express = require('express');
var app = express();
var _ = require('underscore');
var config = require('./config.json');
var port = process.env.PORT || config.port;

//load db
var auctiondb = require("./db/auctiondb");
auctiondb.initialize();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

var api = require("./routes/api")(app);

app.get('/', function (req, res) {
	res.end();
});

var server = app.listen(port, function () {
   var port = server.address().port;

  console.log("Auction Server is running on http://localhost:%s", port);
});

var io = require('socket.io')(server);
var socket = require('./routes/socket')
io.sockets.on('connection', socket.connection);

//export app so we can test it
exports = module.exports = app;
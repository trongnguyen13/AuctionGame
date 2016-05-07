var auctions = require('../models/auctions');
var auctiondb = require("../db/auctiondb");

module.exports = function(app){
	app.get('/auction/api/user/login', function (req, res) {
		var name = req.query.name;
		auctiondb.getUserByName(name, function(user) {
			if (!user) {
				user = auctiondb.addNewUser(name);
			}
			res.end(JSON.stringify(user));
		});
	});
	
	app.get('/auction/api/user/get', function (req, res) {
		auctiondb.getUserByName(req.query.name, function(user) {
			if (!!user) {
				res.end(JSON.stringify(user));
			} else {
				res.end();
			}
		});
	});
	
	app.post('/auction/api/auction/new', function (req, res) {
		var auction = auctions.newAuction(req.body.auction);
		res.end(JSON.stringify(auction));
	});
	
	app.post('/auction/api/auction/bid',  function (req, res) {
		var auction = auctions.bidAuction(req.body.auction, req.body.bidder, req.body.amount);
		res.end(JSON.stringify(auction));
	});
	
	app.get('/auction/api/auction/current', function (req, res) {
		var auction = auctions.getCurrentAuction();
		if (!!auction) {
			res.end(JSON.stringify(auction));
		} else {
			res.end();
		}
	});
}
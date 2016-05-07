var auctions = require('../models/auctions');
var auctiondb = require("../db/auctiondb");
var timers = require('../utils/timers');
var connections = {};

exports.connection = function(socket) {
	socket.on('user:join', function(username) {
		
		var connection = connections[username];
		if (!!connection) {
			connection.emit('user:kickoff', username);
			delete connections[username];
		}
		
		connections[username] = socket;
	});
	socket.on('user:left', function (username) {
		delete connections[username];
	});
	socket.on('auction:refresh', function(refreshedAuction) {
		auctions.setCurrentAuction(refreshedAuction);
		if (refreshedAuction.timeleft > 0 && refreshedAuction.timeleft < 10) {
			timers.stopCountingdown(refreshedAuction, socket);
			refreshedAuction.timeleft = 10;
			timers.startCountingdown(refreshedAuction, socket);
		} 

		socket.broadcast.emit('auction:refresh', refreshedAuction);
	});
	socket.on('auction:timer', function(auction) {
		auctions.setCurrentAuction(auction);
		timers.startCountingdown(auction, socket);
	});
	socket.on('auction:completed', function(auction) {
		timers.startWaitingBeforeCompleted(socket, function() {
		
			auctions.completeAuction();
			if (!!auction.bidder && auction.bidder !== auction.seller) {
				
				auctiondb.sellerCompleteAuction(auction, function() {
					auctiondb.getUserByName(auction.seller, function(user) {
						connections[auction.seller].emit('user:update', user);
					});
				});
				
				auctiondb.buyerCompleteAuction(auction, function() {
					auctiondb.getUserByName(auction.bidder, function(user) {
						connections[auction.bidder].emit('user:update', user);
					});
				});
			}
		});
	});
};
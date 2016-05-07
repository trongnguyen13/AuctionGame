AngularJs & NodeJS Auction Game

 - This is a NodeJs powered by Socket.io, Express and AngularJs that provides the main functions you'd expect from a Auction Game, such as selling, bidding.

Features:
 - Login (If this same user is considered to be currently logged in at another browser or tab, it must be immediately logged out from that other instance.)
 - Start an auction
 - Place a Bid

Setup:
 - Copy source to your desktop and run "npm install" to install all the dependencies.
 - You might want to look into config.json to make change the port you want to use.

Usage:
 - After you copy this source to your desktop, go to its root directory and run "npm install" to install its dependencies.
 - Once the dependencies are installed, you can run "npm start" to start the application. You will then be able to access it at http://localhost:8080
 - Database will be created when you start the server.
 - You can use "npm test" to run the units test

Issue:
 - If you have any error relate to sqlite3, please run "npm uninstall sqlite3" and run "npm install sqlite3" (x84 and x64 not work together)

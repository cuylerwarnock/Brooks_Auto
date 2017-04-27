var express = require('express');
var router = express.Router();

function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	// if(req.method === "GET"){
	// 	return next();
	// }
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/login');
};

/* GET home page. */
router.route('/')
	.get(function(req, res) {
		res.sendFile("main.html", {"root": "../public"});
	});

router.route('/default.html')
	.get(function(req, res) {
		res.sendFile("main.html", {"root": "./public"});
	});

router.route('/main.html')
	.get(function(req, res) {
		res.sendFile("main.html", {"root": "./public"});
	});

router.route('/login.html')
	.get(function(req, res) {
		res.sendFile("main.html", {"root": "./public"});
	});

router.route('/login')
	.get(function(req, res) {
		res.sendFile("main.html", {"root": "./public"});
	});

router.route('/studentList')
	.get(function(req, res) {
		res.sendFile("main.html", {"root": "./public"});
	});

router.route('/home')
	.get(function(req, res) {
		res.sendFile("main.html", {"root": "./public"});
	});

router.route('/classList')
	.get(function(req, res) {
		res.sendFile("main.html", {"root": "./public"});
	});

router.route('/groupList')
	.get(function(req, res) {
		res.sendFile("main.html", {"root": "./public"});
	});

module.exports = router;
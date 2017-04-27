var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Part = mongoose.model('Part');
var Order = mongoose.model('Order');
var bCrypt = require('bcrypt-nodejs');

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	// //allow all get request methods
	// if(req.method === "GET"){
	// 	return next();
	// }
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/login');
};

//Register the authentication middleware
router.use('/parts', isAuthenticated);
router.use('/orders', isAuthenticated);

//USERS
router.route('/users/:username')
	
	//get user
	.get(function(req, res){
		//username passed, so one user
		User.findOne({username: req.params.username}, function(err, user){
			if (err){
				return res.status(500).send(err);
			}
			//return user. if none found, returns null
			return res.send(user);
		});
	})

	// //create new user
	// .post(function(req, res){
	// 	console.log("WE made ti");
	// 	User.find({username: req.body.username}, function(err, userFound){
	// 		if(err){
	// 			return res.status(500).send(err);
	// 		}
	// 		console.log("Checking for user");
	// 		if(userFound){
	// 			console.log("User exists! Sending this to client");
	// 			return res.send({status: "User already exists!"});
	// 		}
	// 		else{
	// 			console.log("User does not exist yet. Creating");
	// 			var user = new User();
	// 			user.fname = req.body.fname;
	// 			user.lname = req.body.lname;
	// 			user.email = req.body.email;
	// 			user.phone = req.body.phone;
	// 			user.username = req.body.username;
	// 			user.password = bCrypt.hashSync(req.params.password, bCrypt.genSaltSync(10), null);
	// 			user.vehicles = [];
	// 			user.save(function(err, newUser){
	// 				if(err){
	// 					return res.status(500).send(err);
	// 				}
	// 				return res.send(newUser);
	// 			})
	// 		}
	// 	})

	// })

	//update existing user
	.put(function(req, res){
		User.findOne({username: req.body.username}, function(err, user){
			if (err){
				return res.status(500).send(err);
			}
			user.fname = req.body.fname;
			user.lname = req.body.lname;
			user.email = req.body.email;
			user.phone = req.body.phone;
			user.username = req.body.username;
			user.vehicles = req.body.vehicles;
			user.cart = req.body.cart;
			user.save(function(err, updateUser){
				if(err){
					return res.status(500).send(err);
				}
				return res.send(updateUser);
			})
		})
	});

router.route('/users/')
	
	.get(function(req, res){
		User.find(function(err, users){
			if(err){
				return res.status(500).send(err);
			}
			return res.send(users);
		})
	})

//update password
router.route('/users/password/:_id')

	.put(function(req, res){
		User.findOne({_id: req.params._id}, function(err, newUser){
			if (err){
				return res.status(500).send(err);
			}
			newUser.password=bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(10), null);
			newUser.save(function(err, updateUser){
				if(err){
					return res.status(500).send(err);
				}
				return res.send(updateUser);
			})
		})
	});

//PARTS
router.route('/parts/:_id')

	//Get part(s)
	.get(function(req, res){
		//get by id
		Part.find({_id: req.params._id}, function(err, part){
			if(err){
				return res.status(500).send(err);
			}
			return res.send(part);
		});
	})

	//update existing part
	.put(function(req, res){
		Part.findOne({_id: req.params._id}, function(err, part){
			if(err){
				return res.status(500).send(err);
			}
			part.name = req.body.name;
			part.price = req.body.price;
			part.img = req.body.img;
			part._id = req.body._id;
			part.save(function(err, post){
				if(err){
					return res.status(500).send(err);
				}
				post.status = "success";
				return res.send(post);
			})
		})
	});

	//Probably no need for this.
	//Why delete a part? May need that eventually.
	// .delete(function(res, req){
	// 	Part.delete()
	// })

router.route("/parts/")

	//get all
	.get(function(req, res){
		Part.find(function(err, parts){
			if(err){
				return res.status(500).send(err);
			}
			return res.send(parts);
		});
	})

	//create new part
	.post(function(req, res){
		var part = new Part();
		part.name = req.body.name;
		part.price = req.body.price;
		part.url = req.body.url;
		part.save(function(err, post){
			if(err){
				return res.status(500).send(err);
			}
			post.status = "success";
			return res.send(post);
		})
	});
	

//ORDER
router.route("/orders/:_id")

	//get order(s)
	.get(function(req, res){
		//get by id
		Order.find({_id: req.params._id}, function(err, order){
			if(err){
				return res.status(500).send(err);
			}
			return res.send(order);
		})
	})

	//update existing order
	.put(function(req, res){
		Order.findOne({_id: req.params._id}, function(err, order){
			if(err){
				return res.status(500).send(err);
			}
			order.name = req.body.name;
			order.total = req.body.total;
			order.parts = req.body.parts;
			order.services = req.body.services;
			order.active = req.body.active;
			order.save(function(err, post){
				if(err){
					return res.status(500).send(err);
				}
				post.status = "success";
				return res.send(post);
			})
		})
	})

	.delete(function(req, res){
		Order.remove({_id: req.params._id}, function(err){
			if(err){
				return res.status(500).send(err);
			}
			return res.send("Deleted");
		})
	})

router.route("/orders/")

	//get all
	.get(function(req, res){
		Order.find(function(err, orders){
			if(err){
				return res.status(500).send(err);
			}
			return res.send(orders);
		})
	})

	//create new order
	.post(function(req, res){
		var order = new Order();
		order.name = req.body.name;
		order.total = req.body.total;
		order.parts = req.body.parts;
		order.active = req.body.active;
		order.save(function(err, post){
			if(err){
				return res.status(500).send(err);
			}
			post.status = "success";
			return res.send(post);
		})
	});

module.exports = router;
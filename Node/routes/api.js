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
// router.use('/studentList', isAuthenticated);

//USERS
router.route('/users/:username')
	
	//check for user
	.get(function(req, res){
		User.findOne({username: req.params.username}, function(err, data){
			if (err){
				return res.send(500, err);
			}
			if(data===null)
				return res.json({available: true});
			else
				return res.json({available: false});
		});
	})

	.put(function(req, res){
		User.findOne({username: req.params.username}, function(err, newUser){
			if (err){
				return res.send(500, err);
			}
			newUser.fname=req.params.fname;
			newUser.lname=req.params.lname;
			newUser.email=req.params.email;
			newUser.password=bCrypt.hashSync(req.params.password, bCrypt.genSaltSync(10), null);
			newUser.save(function(err, post){
				if(err){
					return res.send(500, err);
				}
				return res.json(newUser);
			})
		})
	});

router.route('/users/password/:username')

	.put(function(req, res){
		User.findOne({username: req.params.username}, function(err, newUser){
			if (err){
				return res.send(500, err);
			}
			newUser.password=bCrypt.hashSync(req.params.password, bCrypt.genSaltSync(10), null);
		})
	});

//PARTS
router.route('/parts/:_id')

	.get(function(req, res){
		if(req.params._id){
			//get by id
			Part.find(function(err, parts){
				if(err){
					return res.status(500).send(err);
				}
				return res.send(parts);
			})
		}
		else{
			//get all
			Part.find({_id: req.params._id}, function(err, part){
				if(err){
					return res.status(500).send(err);
				}
				return res.send(part);
			})
		}
	})

	.post(function(req, res){
		var part = new Part();
		part.name = req.body.name;
		part.partID = req.body.partID;
		part.price = req.body.price;
		part.save(function(err, post){
			if(err){
				return res.status(500).send(err);
			}
			post.status = "success";
			return res.send(post);
		})
	})

	.put(function(res, req){
		Part.findOne({_id: req.params._id}, function(err, part){
			if(err){
				return res.status(500).send(err);
			}
			part.name = req.body.name;
			part.partID = req.body.partID;
			part.price = req.body.price;
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

//ORDER
router.route("/orders/:_id")
.get(function(req, res){
		if(req.params._id){
			//get by id
			Order.find(function(err, orders){
				if(err){
					return res.status(500).send(err);
				}
				return res.send(orders);
			})
		}
		else{
			//get all
			Order.find({_id: req.params._id}, function(err, order){
				if(err){
					return res.status(500).send(err);
				}
				return res.send(order);
			})
		}
	})

	.post(function(req, res){
		var order = new Order();
		order.name = req.body.name;
		order.partID = req.body.partID;
		order.price = req.body.price;
		order.save(function(err, post){
			if(err){
				return res.status(500).send(err);
			}
			post.status = "success";
			return res.send(post);
		})
	})

	.put(function(res, req){
		Order.findOne({_id: req.params._id}, function(err, order){
			if(err){
				return res.status(500).send(err);
			}
			order.name = req.body.name;
			order.partID = req.body.partID;
			order.price = req.body.price;
			order.save(function(err, post){
				if(err){
					return res.status(500).send(err);
				}
				post.status = "success";
				return res.send(post);
			})
		})
	});
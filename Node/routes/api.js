var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Student = mongoose.model('Student');
var Class = mongoose.model('Class');
var Group = mongoose.model('Group');
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
router.use('/studentList', isAuthenticated);
router.use('/classList', isAuthenticated);
router.use('/groupList', isAuthenticated);

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
	})

//STUDENTS
//api for all studentList
router.route('/studentList')
	
	//create a new student
	.post(function(req, res){

		var student = new Student();
		student.name = req.body.name;
		student.sid = req.body.sid;
		student.LType = req.body.LType;
		student.PType = req.body.PType;
		student.RLevel = req.body.RLevel;
		student.classes = req.body.classes;
		student.groups = req.body.groups;
		student.save(function(err, post) {
			if (err){
				return res.send(500, err);
			}
			return res.json(student);
		});
	})

	.get(function(req, res){
		Student.find(function(err, data){
			if(err){
				return res.send(500, err);
			}

			return res.send(data);
		});
	});

//api for a specfic student
router.route('/studentList/:_id')
	
	//update specified student
	.put(function(req,res){
		Student.findById(req.params._id, function(err, student){
			if(err) {
				res.send(err);
			}

			student.name = req.body.name;
			student.sid = req.body.sid;
			student.LType = req.body.LType;
			student.PType = req.body.PType;
			student.RLevel = req.body.RLevel;
			student.classes = req.body.classes;
			student.groups = req.body.groups;

			student.save(function(err, student){
				if(err)
					res.send(err);

				res.json(student);
			});
		});
	})
	//get specified student
	.get(function(req,res){
		Student.findById(req.params.id, function(err, student){
			if(err)
				res.send(err);
			res.json(student);
		});
	})
	//delete specified student
	.delete(function(req,res){
		Student.remove({
			_id: req.params._id
		}, function(err) {
			if (err)
				res.send(err);
			res.json("deleted");
		});
	});

//access students by class
router.route('/studentList/class/:class')

	.get(function(req, res){
		Student.find({classes: {$elemMatch: {class: req.params.cid}}}, function(err, data){
			if(err){
				return res.send(500, err);
			}

			return res.send(data);
		});
	});

//access students by group
router.route('/studentList/group/:group')

	.get(function(req, res){
		Student.find({groups: {$elemMatch: {group: req.params.gid}}}, function(err, data){
			if(err){
				return res.send(500, err);
			}

			return res.send(data);
		});
	});

//CLASSES
//api for all classes
router.route('/classList')
	
	//create a new class
	.post(function(req, res){

		var class1 = new Class();
		class1.name = req.body.name;
		class1.teacher = req.body.teacher;
		class1.studentList = req.body.studentList;
		class1.groupList = req.body.groupList;
		class1.save(function(err, post) {
			if (err){
				return res.send(500, err);
			}
			return res.json(class1);
		});
	})

	.get(function(req, res){
		Class.find(function(err, data){
			if(err){
				return res.send(500, err);
			}

			return res.send(data);
		});
	});

router.route('/classList/teacher/:teacher')

	.get(function(req, res){
		Class.find({teacher: req.params.teacher}, function(err, data){
			if(err){
				return res.send(500, err);
			}

			return res.send(data);
		});
	});

//api for a specfic class by _id
router.route('/classList/:_id')
	
	//update specified group
	.put(function(req,res){
		Class.findById(req.params._id, function(err, c){
			if(err)
				res.send(err);

			c.name = req.body.name;
			c.teacher = req.body.teacher;
			c.studentList = req.body.studentList;
			c.groupList = req.body.groupList;

			c.save(function(err, group){
				if(err)
					res.send(err);

				res.json(c);
			});
		});
	})
	//get specified group
	.get(function(req,res){
		Class.find({_id: req.params.class}, function(err, c){
			if(err)
				res.send(err);
			res.json(c);
		});
	})
	//delete specified group
	.delete(function(req,res){
		Class.remove({
			_id: req.params._id
		}, function(err) {
			if (err)
				res.send(err);
			res.json("deleted by id"+req.params._id);
		});
	});

//GROUPS
//api for all groups
router.route('/groupList')
	
	//create a new group
	.post(function(req, res){

		var group = new Group();
		group.name = req.body.name;
		group.size = req.body.size;
		group.activityType = req.body.activityType;
		group.selectType = req.body.selectType;
		group.class = req.body.class;
		group.studentList = req.body.studentList;
		group.save(function(err, post) {
			if (err){
				return res.send(500, err);
			}
			return res.json(group);
		});
	})

	//shouldn't be used
	.get(function(req, res){
		Group.find(function(err, data){
			if(err){
				return res.send(500, err);
			}

			return res.send(data);
		});
	});

router.route('/groupList/class/:class')

	.get(function(req, res){
		Group.find({"class.cid": {$in: req.params.class}}, function(err, data){
			if(err){
				return res.send(500, err);
			}

			return res.send(data);
		});
	});

//api for a specfic group
router.route('/groupList/:id')
	
	//update specified group
	.put(function(req,res){
		Group.findById(req.params.id, function(err, group){
			if(err)
				res.send(err);

			group.name = req.body.name;
			group.size = req.body.size;
			group.activityType = req.body.activityType;
			group.selectType = req.body.selectType;
			group.class = req.body.class;
			group.studentList = req.body.studentList;

			group.save(function(err, group){
				if(err)
					res.send(err);

				res.json(group);
			});
		});
	})
	//get specified group
	.get(function(req,res){
		Group.findById(req.params.id, function(err, group){
			if(err)
				return res.send(err);
			return res.json(group);
		});
	})
	//delete specified group
	.delete(function(req,res){
		Group.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
				res.send(err);
			res.send("deleted :(");
		});
	});

module.exports = router;
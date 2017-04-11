var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String, //hash created from pwd
	created_at: {type: Date, default: Date.now},
	fname: String,
	lname: String,
	email: String
});

var studentSchema = new mongoose.Schema({
	name: String,
	LType: String,
	PType: String,
	RLevel: Number,
	classes: Array,
	groups: Array
});

var classSchema = new mongoose.Schema({
	name: String,
	teacher: String,
	studentList: Array,
	groupList: Array
});

var groupSchema = new mongoose.Schema({
	name: String,
	size: Number,
	activityType: String,
	class: {cid: String, name: String},
	selectType: String,
	studentList: Array
});

//Declare model called User with schema userSchema
mongoose.model("User", userSchema);
mongoose.model("Student", studentSchema);
mongoose.model("Class", classSchema);
mongoose.model("Group", groupSchema);
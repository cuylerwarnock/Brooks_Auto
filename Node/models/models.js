var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String, //hash created from pwd
	created_at: {type: Date, default: Date.now},
	fname: String,
	lname: String,
	email: String,
	phone: String,
	vehicles: Array
});

var partSchema = new mongoose.Schema({
	name: String,
	partID: String,
	price: Number,
});

var orderSchema = new mongoose.Schema({
	name: String,
	total: Number,
	parts: Array,
	created_at: {type: Date, default: Date.now}
});

//Declare model called User with schema userSchema
mongoose.model("User", userSchema);
mongoose.model("Part", partSchema);
mongoose.model("Order", orderSchema);


//Preferred db schema structure: user has vehicles which have a history of orders which can refer to parts if needed.
//Tree like as opposed to doubly redundant tables
//For simplicity's sake: only store reference to part number in orders.
//This requires more db calls to resolve the part object,
//but doesn't require massive amounts of code and thought for updates.
//Simple, but less efficient, but who cares for this garbo project xD!
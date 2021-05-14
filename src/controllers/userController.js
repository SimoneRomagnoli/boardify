var mongoose = require('mongoose');
User = require("../models/user_model")(mongoose);

exports.show_index = function(req, res) {
	res.sendFile(appRoot  + '/www/home.html');
};

exports.list_users = function(req, res) {
	User.find({}, function(err, user) {
		if (err)
			res.send(err);
		res.json(user);
	});
};
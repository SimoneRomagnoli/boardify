var mongoose = require('mongoose');
User = require("../models/user_model")(mongoose);

exports.show_index = (req, res) => {
	res.sendFile(appRoot  + '/www/index.html');
};

exports.list_users = (req, res) => {
	User.find({}, (err, user) => {
		if (err) { res.send(err); }
		else { res.json(user); }
	});
};
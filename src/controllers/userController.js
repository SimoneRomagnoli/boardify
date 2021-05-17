const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
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

exports.register_user = (req, res) => {
	const {
		username, email, password, confirm_password
	} = req.body;

	User.find({ $or: [ { email:email }, { username:username } ] }, async (err, users) => {
		if (err) { res.send(err); return }
		else if (users.length > 0) { res.send({ message: "User already registered" }); return }
		else if (password !== confirm_password) { res.send({ message: "Passwords do not match" }); return }

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			username: username,
			email: email,
			password: hashedPassword
		});
		newUser.save((err,doc) => {
			if (err) { res.send(err); }
			else { res.send(doc); }
		})
	})
}

exports.login_user = (req, res) => {
	
}
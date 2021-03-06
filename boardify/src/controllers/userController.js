const bcrypt = require('bcrypt')
const User = require('../config/database').User
const passport = require('passport')

exports.show_index = (req, res) => {
	res.sendFile(appRoot  + '/www/index.html');
};

exports.show_signin = (req, res) => {
	res.sendFile(appRoot  + '/www/signin.html');
};

exports.show_signup = (req, res) => {
	res.sendFile(appRoot  + '/www/signup.html');
};

exports.list_users = (req, res) => {
	User.find({}, (err, user) => {
		if (err) { res.send(err); }
		else { res.json(user); }
	});
};

exports.get_session_user = (req, res) => {
	if (req.session.user) { 
		User.find({username: req.session.user.username}, (err, users) => {
			if (err) { res.send(err); }
			else {
				if(users.length > 0) {
					res.json(users[0])
				}
				else { 
					res.json({error: "This user does not exist"})
				}
			}
		});
	 }
	else { res.send({}); }
}

exports.get_user = (req, res) => {
	User.find({username: req.params.username}, (err, users) => {
		if (err) { res.send(err); }
		else {
			if(users.length > 0) {
				res.json(users[0])
			}
			else { 
				res.json({error: "This user does not exist"})
			}
		}
	});
}

exports.get_userinfo = (req, res) => {
	User.find({username: req.body.members}, (err, users) => {
		if (err) { res.send(err); }
		else { 
			let result = [];
			users.forEach(u => {
				result.push({username: u.username, firstname: u.firstname, lastname: u.lastname});
			});
			res.send(result);
		}
	});
}

exports.check_user = (req, res) => {
	User.find({username: req.params.username}, (err, user) => {
		if (err) { res.send(err); }
		else {
			if(user.length > 0) {
				if(user[0].username === req.session.user.username) {
					res.json({error: "You cannot add yourself"})
				} else {
					res.json({username: user[0].username})
				}
			}
			else res.json({error: "This user does not exist"})
		}
	});
}

exports.change = (req, res) => {
	const {
		username,
		firstname,
		lastname,
		email
	} = req.body;

	User.updateOne({username:username}, {$set: {"firstname":firstname, "lastname":lastname, "email":email}}, (err, user) => {
		if (err) { res.send(err); }
		else { res.json(user); }
	});
}

exports.change_password = (req, res) => {
	const {
		oldPassword, newPassword, repeatPassword
	} = req.body;

	User.find({username:req.session.user.username}, async (err, users) => {
		if(err) {res.send(err); }
		else {
			if(!bcrypt.compareSync(oldPassword, users[0].password)) {
				res.json({error: 'The old password is incorrect.'});
			} else {
				if(newPassword == "") {res.send({error:"Password cannot be empty."})}
				if(newPassword !== repeatPassword) {
					res.send({error: 'Error in repeating new password.'});
				} else {
					const hashedNewPassword = await bcrypt.hash(newPassword, 10);
					User.updateOne({username:req.session.user.username}, {$set: {password:hashedNewPassword}}, (err, user) => {
						if(err) {res.send(err)}
						else {res.json(user)}
					});
				}
			}
		}
	});
}

exports.register_user = (req, res) => {
	const {
		firstname, lastname, username, email, password, confirm_password
	} = req.body;

	User.find({ $or: [ { email:email }, { username:username } ] }, async (err, users) => {
		if (err) { res.send(err); return }
		else if (users.length > 0) { res.send({ message: "User already registered" }); return }
		else if (password !== confirm_password) { res.send({ message: "Passwords do not match" }); return }

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			firstname: firstname,
			lastname: lastname,
			username: username,
			email: email,
			password: hashedPassword
		});
		newUser.save((err,doc) => {
			if (err) { res.send(err); }
			else { res.redirect('/signin'); }
		})
	})
}

exports.login_user = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) { return next(err); }
		if (!user) { return res.json({message: info.message}); }
		req.logIn(user, (err) => {
			if (err) { return next(err); }
			req.session.user = user;
			res.redirect("/");
		})

	})(req, res, next)
}

exports.logout = (req, res) => {
	req.logout();
	res.redirect("/signin");
}
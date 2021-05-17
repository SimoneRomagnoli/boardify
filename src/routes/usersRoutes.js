module.exports = function(app) {
	var usersController = require('../controllers/userController');
		
	app.route('/')
		.get(usersController.show_index);

	app.route('/users')
		.get(usersController.show_index);

	app.route('/signup')
		.get(usersController.show_index);

	app.route('/signin')
		.get(usersController.show_index);

	app.route('/api/users')
		.get(usersController.list_users);

	app.route('/api/signup')
		.post(usersController.register_user);

	app.route('/api/signin')
		.post(usersController.login_user);
};
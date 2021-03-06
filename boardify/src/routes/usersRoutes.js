const { forwardAuthenticated, ensureAuthenticated } = require('../config/authentication')

module.exports = app => {
	const usersController = require('../controllers/userController');
		
	app.route('/')
		.get(ensureAuthenticated, usersController.show_index);

	app.route('/about')
		.get(ensureAuthenticated, usersController.show_index);

	app.route('/settings')
		.get(ensureAuthenticated, usersController.show_index);

	app.route('/signup')
		.get(forwardAuthenticated, usersController.show_signup);

	app.route('/signin')
		.get(forwardAuthenticated, usersController.show_signin);

	app.route('/api/users/:username')
		.get(usersController.check_user)
		.put(usersController.change);

	app.route('/api/user/password')
		.put(usersController.change_password);

	app.route('/api/usersinfo')
		.post(usersController.get_userinfo);

	app.route('/api/signup')
		.post(usersController.register_user);

	app.route('/api/signin')
		.post(usersController.login_user);

	app.route('/session/user')
		.get(usersController.get_session_user);

	app.route('/logout')
		.get(usersController.logout);
};
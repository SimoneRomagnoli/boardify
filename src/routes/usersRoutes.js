module.exports = function(app) {
	var usersController = require('../controllers/userController');
		
	app.route('/')
		.get(usersController.show_index);

	app.route('/api/users')
		.get(usersController.list_users);
};
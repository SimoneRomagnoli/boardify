module.exports = function(app) {
	var usersController = require('../controllers/userController');
		
	app.route('/')
		.get(usersController.show_index);

	app.route('/users')
		.get(usersController.list_users);
};
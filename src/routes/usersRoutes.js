module.exports = function(app) {
	var usersController = require('../controllers/userController');
		
	app.route('/users')
		.get(usersController.list_users);
};
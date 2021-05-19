module.exports = function(app) {
	var boardsController = require('../controllers/boardController');

	app.route('/api/projects')
		.get(boardsController.get_projects);

	app.route('/api/project')
		.post(boardsController.create_project);
};
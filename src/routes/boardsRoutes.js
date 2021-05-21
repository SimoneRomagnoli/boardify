module.exports = function(app) {
	var boardsController = require('../controllers/boardController');

	app.route('/api/board/:owner/:title')
		.get(boardsController.get_board)
		.put(boardsController.assign_task);

	app.route('/api/projects')
		.get(boardsController.get_projects);

	app.route('/api/project')
		.post(boardsController.create_project);
};
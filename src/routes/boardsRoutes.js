module.exports = function(app) {
	var boardsController = require('../controllers/boardController');

	app.route('/api/board/:owner/:title')
		.get(boardsController.get_board);

	app.route('/api/board/:owner/:title/:task')	
		.get(boardsController.get_task);

	app.route('/api/board/:owner/:title/assign')	
		.put(boardsController.assign_task);

	app.route('/api/board/:owner/:title/remove')	
		.put(boardsController.remove_task);

	app.route('/api/projects')
		.get(boardsController.get_projects);

	app.route('/api/project')
		.post(boardsController.create_project);
};
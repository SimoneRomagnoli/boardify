
const { forwardAuthenticated, ensureAuthenticated } = require('../config/authentication')

module.exports = app => {
	const boardsController = require('../controllers/boardController');

	app.route('/board/:owner/:title')
		.get(ensureAuthenticated, boardsController.show_index);

	app.route('/api/board/:owner/:title')
		.get(boardsController.get_board);

	app.route('/api/board/:owner/:title/:task')	
		.get(boardsController.get_task);

	app.route('/api/board/:owner/:title/newTask')	
		.put(boardsController.create_task);
		
	app.route('/api/board/:owner/:title/newTopic')	
		.put(boardsController.create_topic);

	app.route('/api/board/:owner/:title/newUsers')	
		.put(boardsController.add_users);

	app.route('/api/board/:owner/:title/assign')	
		.put(boardsController.assign_task);

	app.route('/api/board/:owner/:title/remove')	
		.put(boardsController.remove_task);

	app.route('/api/board/:owner/:title/comment')	
		.put(boardsController.save_comment);

	app.route('/api/projects')
		.get(boardsController.get_projects);

	app.route('/api/project')
		.post(boardsController.create_project);
};
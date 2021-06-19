const { forwardAuthenticated, ensureAuthenticated } = require('../config/authentication')

module.exports = app => {
    const controller = require('../controllers/notificationsController');

    app.route('/notifications')
		.get(ensureAuthenticated, controller.show_index);

    app.route('/api/notification')
        .post(controller.new_notification)
        .get(controller.get_notifications)
}
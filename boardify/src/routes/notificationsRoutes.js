const { forwardAuthenticated, ensureAuthenticated } = require('../config/authentication')

module.exports = app => {
    const controller = require('../controllers/notificationsController');

    app.route('/notifications')
		.get(ensureAuthenticated, controller.show_index);

    app.route('/api/notification')
        .post(ensureAuthenticated, controller.new_notification)
        .get(ensureAuthenticated, controller.get_notifications)
        .put(ensureAuthenticated, controller.read_notifications)
}
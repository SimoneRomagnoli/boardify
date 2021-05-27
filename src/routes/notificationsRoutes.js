module.exports = app => {
    const controller = require('../controllers/notificationsController');

    app.route('/api/notifications')
        .get(controller.get_notifications)
}
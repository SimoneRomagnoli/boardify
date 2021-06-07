module.exports = app => {
    const controller = require('../controllers/notificationsController');

    app.route('/api/notification')
        .post(controller.new_notification)
}
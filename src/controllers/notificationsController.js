const Notification = require('../config/database').Notification

exports.show_index = (req, res) => {
	res.sendFile(appRoot  + '/www/index.html');
};

exports.get_notifications = (req, res) => {
    Notification.find({to:req.session.user.username}, (err, nots) => {
        if (err) { res.send(err); }
        else { res.json(nots); }
    });
}

exports.new_notification = (req, res) => {
    const notification = {
        to, project, message, object, read, url, date
    } = req.body;

    new Notification(notification).save((err, doc) => {
        if (err) { res.send(err); }
        else { res.send(doc); }
    });
}
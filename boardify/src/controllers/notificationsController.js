const Notification = require('../config/database').Notification

exports.show_index = (req, res) => {
	res.sendFile(appRoot  + '/www/index.html');
};

exports.get_notifications = (req, res) => {
    Notification.find({"to.user":req.session.user.username}, (err, nots) => {
        if (err) { res.send(err); }
        else { res.json(nots); }
    });
}

exports.new_notification = (req, res) => {
    const notification = {
        to, project, message, object, url, date
    } = req.body;

    new Notification(notification).save((err, doc) => {
        if (err) { res.send(err); }
        else { res.send(doc); }
    });
}

exports.read_notifications = (req, res) => {
    const project = req.body;

    Notification.updateMany({$and: [{"project.title": project.title}, {"project.owner": project.owner}, {"to.user":req.session.user.username}]}, {$set: {"to.$.read":true}}, (err, nots) => {
        if (err) { res.send(err); }
        else { res.json(nots); }
    });
}
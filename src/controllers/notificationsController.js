const Notification = require('../config/database').Notification

exports.get_notifications = (req, res) => {
    Notification.find({to:req.session.user.username}, (err, nots) => {
        if (err) { res.send(err); }
        else { res.json(nots); }
    });
}
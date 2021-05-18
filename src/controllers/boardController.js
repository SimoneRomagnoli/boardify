const Board = require('../config/database').Board

exports.get_projects = (req, res) => {
	Board.find({owner:req.session.user.username}, (err, boards) => {
		if (err) { res.send(err); }
		else { res.json(boards); }
	});
};

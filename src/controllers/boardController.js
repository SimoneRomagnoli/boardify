const Board = require('../config/database').Board

exports.get_projects = (req, res) => {
	Board.find({$or: [{owner:req.session.user.username}, {members:req.session.user.username}]}, (err, boards) => {
		if (err) { res.send(err); }
		else { res.json(boards); }
	});
};

exports.get_board = (req, res) => {
	Board.find({$and: [{owner:req.params.owner}, {title:req.params.title}]}, (err, board) => {
		if (err) { res.send(err); }
		else { res.json(board); }
	});
}

exports.assign_task = (req, res) => {
	const {
		name
	} = req.body;

	Board.updateOne({$and: [{owner: req.params.owner}, {title: req.params.title}, {"tasks.name":name}]}, {$set: {"tasks.$.user":req.session.user.username}}, (err, board) => {
		if (err) { res.send(err); }
		else { res.json(board); }
	});
	
}

exports.create_project = (req, res) => {
	const {
		title, members, description, tasks, topics
	} = req.body;

	const owner = req.session.user.username;

	if(title === "") {return res.send({message: "Missing project title"})}

	Board.find({ $and: [ { owner:owner }, { title:title } ] }, async (err, boards) => {
		if (err) { res.send(err); return }
		else if (boards.length > 0) { res.send({ message: "You already have created this project before" }); return }

		const newBoard = new Board({
			owner: owner,
			title: title,
			description: description,
			members: members,
			topics: topics,
			tasks: tasks
		});

		newBoard.save((err,doc) => {
			if (err) { res.send(err); }
			else { res.redirect('/'); }
		})
	})

};

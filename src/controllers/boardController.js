const Board = require('../config/database').Board

exports.get_projects = (req, res) => {
	Board.find({$or: [{owner:req.session.user.username}, {members:req.session.user.username}]}, (err, boards) => {
		if (err) { res.send(err); }
		else { res.json(boards); }
	});
};

exports.create_project = (req, res) => {
	const {
		title, members, description, tasks, topics
	} = req.body;

	const owner = req.session.user.username;

	if(title === "") {return res.send({message: "Missing project title"})}

	Board.find({ $and: [ { owner:owner }, { title:title } ] }, async (err, boards) => {
		if (err) { res.send(err); return }
		else if (boards.length > 0) { res.send({ message: "You already have created this project" }); return }

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

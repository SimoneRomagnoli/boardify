const Board = require('../config/database').Board
const QRCode = require('qrcode');
const host = "http://87.6.240.24/";

exports.show_index = (req, res) => {
	res.sendFile(appRoot  + '/www/index.html');
};

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

exports.get_board_qr = (req, res) => {

	QRCode.toDataURL(host + "api/board/"+req.params.owner+"/"+req.params.title+"/addSessionUser")
	.then(url => {
		res.send(url)
	})
	.catch(err => {
		console.error(err)
	})
}

exports.get_task = (req, res) => {
	Board.find({$and: [{owner:req.params.owner}, {title:req.params.title}, {"tasks.name":req.params.task}]}, (err, board) => {
		if (err) { res.send(err); }
		else { 
			const task = board[0].tasks.filter(t => {
				return t.name == req.params.task
			})
			res.json(task); 
		}
	});
}

exports.delete_task = (req, res) => {
	Board.updateOne({$and: [{owner: req.params.owner}, {title: req.params.title}]}, {$pull: {tasks: {name: req.params.task}}}, (err, board) => {
		if (err) {res.send(err); }
		else { res.json(board); }
	})
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

exports.change_task_state = (req, res) => {
	const task = req.body;

	if(task.state === 'TODO') {
		Board.updateOne({$and: [{owner: req.params.owner}, {title: req.params.title}, {"tasks.name":task.name}]}, {$set: {"tasks.$.state":'RUNNING'}}, (err, board) => {
			if (err) { res.send(err); }
			else { res.json(board); }
		});
	}
	if(task.state === 'RUNNING') {
		Board.updateOne({$and: [{owner: req.params.owner}, {title: req.params.title}, {"tasks.name":task.name}]}, {$set: {"tasks.$.state":'DONE'}}, (err, board) => {
			if (err) { res.send(err); }
			else { res.json(board); }
		});
	}
	
}

exports.save_comment = (req, res) => {
	const {
		name, comment
	} = req.body;

	Board.updateOne({$and: [{owner: req.params.owner}, {title: req.params.title}, {"tasks.name":name}]}, {$set: {"tasks.$.comment":comment}}, (err, board) => {
		if (err) { res.send(err); }
		else { res.json(board); }
	});
	
}

exports.remove_user = (req, res) => {
	const {
		username
	} = req.body;

	Board.updateOne({$and: [{owner: req.params.owner}, {title: req.params.title}]}, {$pull: {members:username}}, (err, board) => {
		if (err) { res.send(err); }
		else { res.json(board); }
	});
}

exports.remove_task = (req, res) => {
	const {
		name
	} = req.body;

	Board.updateOne({$and: [{owner: req.params.owner}, {title: req.params.title}, {"tasks.name":name}]}, {$set: {"tasks.$.user":null, "tasks.$.state":'TODO'}}, (err, board) => {
		if (err) { res.send(err); }
		else { res.json(board); }
	});
}

exports.create_task = (req, res) => {
	const task = req.body;

	Board.updateOne({$and: [{owner: req.params.owner}, {title: req.params.title}]}, {$push: {"tasks":task}}, (err, board) => {
		if (err) { res.send(err); }
		else { res.json(board);	}
	});
}

exports.create_topic = (req, res) => {
	const topic = req.body.name;

	Board.updateOne({$and: [{owner: req.params.owner}, {title: req.params.title}]}, {$push: {"topics":topic}}, (err, board) => {
		if (err) { res.send(err); }
		else { res.json(board); }
	});
}

exports.add_session_user = (req, res) => {
	const user = req.session.user.username;
	
	Board.find({$and: [{owner:req.params.owner}, {title:req.params.title}]}, (err, boards) => {
		if (err) { res.send(err); }
		else { 
			const members = boards[0].members;

			if(members.includes(user)) {
				res.send({error: "This user already belongs to this board."})
			} else {
				Board.updateOne({$and: [{owner: req.params.owner}, {title: req.params.title}]}, {$push: {"members": user}}, (err, board) => {
					if (err) { res.send(err); }
					else { res.redirect("/board/"+req.params.owner+"/"+req.params.title) }
				})
			}
		 }
	});
}

exports.add_users = (req, res) => {
	const {users} = req.body;
	
	Board.updateOne({$and: [{owner: req.params.owner}, {title: req.params.title}]}, {$push: {"members":{ $each: users}}}, (err, board) => {
		if (err) { res.send(err); }
		else { res.json(board); }
	})
}

exports.create_project = (req, res) => {
	const {
		title, members, description, tasks, topics
	} = req.body;

	const owner = req.session.user.username;
	members.unshift(owner);

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

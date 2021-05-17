const mongoose = require('mongoose')

const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', true);

exports.User = require('../models/user_model')(mongoose)
exports.Board = require('../models/board_model')(mongoose)
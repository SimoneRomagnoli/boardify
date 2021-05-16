var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');
global.appRoot = path.resolve(__dirname);

app.use('/static', express.static(__dirname + '/public'));

var uri = 'mongodb+srv://admin:Boardify2021!@boardifycluster.8hl3a.mongodb.net/boardify?retryWrites=true&w=majority'
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', true);

app.use(cors())
app.use(express.json());
var routes = require('./src/routes/usersRoutes');
routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(3000, function (){
    console.log('Listening on port 3000')
})
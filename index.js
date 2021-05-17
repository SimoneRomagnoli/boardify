require('dotenv').config()
const express = require('express');
const app = express();
const database = require('./src/config/database');
const path = require('path');
const passport = require('passport')

global.appRoot = path.resolve(__dirname);

app.use('/static', express.static(__dirname + '/public'));

// Passport authentication middleware
require('./src/config/passport')(passport);
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
var routes = require('./src/routes/usersRoutes');
routes(app);

app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
})
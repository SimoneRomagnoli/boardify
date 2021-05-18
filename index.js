require('dotenv').config()
const express = require('express');
const app = express();
const database = require('./src/config/database');
const path = require('path');
const passport = require('passport')
const session = require('express-session')

global.appRoot = path.resolve(__dirname);
app.use('/static', express.static(__dirname + '/public'));

// Session handling
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // ONE DAY
        }
    })
)

// Passport authentication middleware
require('./src/config/passport')(passport);
app.use(passport.initialize())
app.use(passport.session())

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Define routes
var userRoutes = require('./src/routes/usersRoutes');
userRoutes(app);

var boardRoutes = require('./src/routes/boardsRoutes');
boardRoutes(app);

app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
})
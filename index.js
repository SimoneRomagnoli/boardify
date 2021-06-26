require('dotenv').config()
const express = require('express');
const app = express();
const database = require('./src/config/database');
const path = require('path');
const passport = require('passport')
const session = require('express-session')
const http = require('http').Server(app);
const io = require('socket.io')(http);

global.appRoot = path.resolve(__dirname);
app.use('/static', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

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
const userRoutes = require('./src/routes/usersRoutes');
userRoutes(app);

const boardRoutes = require('./src/routes/boardsRoutes');
boardRoutes(app);

const notificationRoutes = require('./src/routes/notificationsRoutes');
notificationRoutes(app);

app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

io.on('connection', socket => {
    socket.on('notification', notification => {
        io.emit('notification', notification);
    });
});

http.listen(3000, () => {
    console.log('Listening on port 3000')
})

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const PassportUser = require('../config/database').User

initialize = passport => {
    passport.use(
        new LocalStrategy({
            usernameField: "username",
            passwordField: "password"
        }, (username, password, done) => {
            PassportUser.find({ username:username }, (err, doc) => {
                if (err) { throw err; }
                else if (doc.length <= 0) {
                    return done(null, false, { message: "Incorrect username or password" });
                } else if (!bcrypt.compareSync(password, doc[0].password)) {
                    return done(null, false, { message: "Incorrect username or password" })
                } else { return done(null, doc[0]) }
            })
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.username);
    })
    passport.deserializeUser((username, done) => {
        PassportUser.find({ username:username }, (err, doc) => {
            done(err, doc[0]);
        })
    })
}

module.exports = initialize
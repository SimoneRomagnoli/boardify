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
                if (err) { return done(err); }
                else if (doc.length <= 0) {
                    return done(null, false, { message: "Incorrect username" });
                } else if (!bcrypt.compareSync(password, doc[0].password)) {
                    return done(null, false, { message: "Incorrect password" })
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
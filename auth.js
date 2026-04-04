const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log('Received Credentials:', username, password);

        const user = await Person.findOne({ username: username });

        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }

        // Note: comparePassword should be defined in your Person model
        const isMatch = await user.comparePassword(password);

        if (isMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password' });
        }

    } catch (err) {
        return done(err);
    }
}));

module.exports = passport;
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const app = express();
const GithubStrategy = require('./strategies/githubStrategy');
const LinkedInStrategy = require('./strategies/linkedInStrategy');
const config = require('./appsettings.json');
const port = 4000;

app.use(cors({
    origin: config.clientUrl,
    credentials: true
}));
app.use(cookieParser());
app.use(session({ secret: 'my-secret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Setup strategies
passport.use(GithubStrategy);
passport.use(LinkedInStrategy);

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(null); }
    return res.status(401).send();
}

app.get('/check-credentials', ensureAuthenticated, (req, res) => res.json(true));

app.get('/user-info', ensureAuthenticated, (req, res) => {
    switch (req.user.auth_type) {
        case 'linkedin': return res.send({
            profile: req.user.photos[0].value,
            fullName: req.user.displayName
        });
        case 'github': return res.send({
            profile: req.user._json.avatar_url,
            fullName: req.user._json.name
        });
    }
    res.send({});
});

app.get('/failed', (req, res) => {
    res.status(401).send();
})

app.get('/auth/github',
    passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
    passport.authenticate('github', {
        successRedirect: `${config.clientUrl}/dashboard`,
        failureRedirect: '/failed'
    }),
    function (req, res) {
        res.redirect('/');
    });

app.get('/auth/linkedin',
    passport.authenticate('linkedin'));

app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', {
        successRedirect: `${config.clientUrl}/dashboard`,
        failureRedirect: '/failed'
    }),
    function (req, res) {
        res.redirect('/');
    });

app.get('/logout', function (req, res) {
    req.logout();
    return res.redirect(config.clientUrl);
});

app.listen(port, () => {
    console.log(`Listening at ${port}`);
});
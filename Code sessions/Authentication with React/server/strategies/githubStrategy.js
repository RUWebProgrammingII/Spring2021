const GitHubStrategy = require('passport-github2').Strategy;

const GITHUB_CLIENT_ID = '<insert-client-id>';
const GITHUB_CLIENT_SECRET = '<insert-client-secret>';
const GITHUB_CALLBACK_URL = 'http://localhost:4000/auth/github/callback'

module.exports = new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    profile.auth_type = 'github';
    return done(null, profile);
});

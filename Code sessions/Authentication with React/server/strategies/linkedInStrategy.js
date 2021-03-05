const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const LINKEDIN_CLIENT_ID = '<insert-client-id>';
const LINKEDIN_CLIENT_SECRET = '<insert-client-secret>';
const LINKED_IN_REDIRECT_URL = 'http://localhost:4000/auth/linkedin/callback'

module.exports = new LinkedInStrategy({
    clientID: LINKEDIN_CLIENT_ID,
    clientSecret: LINKEDIN_CLIENT_SECRET,
    callbackURL: LINKED_IN_REDIRECT_URL,
    scope: ['r_emailaddress', 'r_liteprofile']
}, function (accessToken, refreshToken, profile, done) {
    profile.auth_type = 'linkedin';
    return done(null, profile);
});

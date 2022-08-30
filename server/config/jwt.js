const eJWT = require('express-jwt');
const config = require('./dbConfig.js');
const userService = require('../src/services/users.services');

module.exports = () => {
    const secret = config.secret;
    return eJWT({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/authenticate',
            '/api/users/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    done();
};
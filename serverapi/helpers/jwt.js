//using jwt for authentication

const expressJwt = require('express-jwt');
const config = require('../config/config.json');
const userService = require('../user/userService.js');
const { pathToRegexp, match, parse, compile } = require("path-to-regexp");
module.exports = jwt;

function jwt() {
    const secret = config.secret;
    const unprotected = [// public routes that don't require authentication
    '/api/user/authenticate',
    '/api/user/register',
    '/api/films',
    pathToRegexp('/api/admin/films/:id',[]),
    pathToRegexp('/api/admin/encode/:id',[]),
    '/api/admin',
    '/api/admin/films/create',
    '/api/admin/films/upload-video',
    '/api/admin/films/upload-sub'
    ];
    return expressJwt({ secret, isRevoked }).unless({
        path: unprotected
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);
    // revoke token if user no longer exists
    if (!user) {
        console.log("user is revoked")
        return done(null, true);
    }

    done();
};
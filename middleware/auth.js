/**
 * Created by Koszta Ádám on 2016. 04. 10..
 */

var LastfmAPI = require('lastfmapi');
var config = require('../config/config');

module.exports = function () {

    // Create a new instance
    var lfm = new LastfmAPI({
        'api_key': config.lastfmapi.api_key,
        'secret': config.lastfmapi.api_key.secret
    });

    var mySessionCreds = {
        'username': config.sessionCreds.username,
        'key': config.sessionCreds.key
    };

    return function (req, res, next) {

        lfm.setSessionCredentials(mySessionCreds.username, mySessionCreds.key);

        lfm.setSessionCredentials(mySessionCreds.username, mySessionCreds.key);

        //var authUrl = lfm.getAuthenticationUrl({'cb': 'http://example.com/auth'});

        res.tpl.lfm = lfm;

        return next();
    };

};

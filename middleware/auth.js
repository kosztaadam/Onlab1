/**
 * Created by Koszta Ádám on 2016. 04. 10..
 */

var LastfmAPI = require('lastfmapi');

module.exports = function () {

    // Create a new instance
    var lfm = new LastfmAPI({
        'api_key': '2e48ce2946a976be45b078fa422f1ee0',
        'secret': '9192b61f923124596d4314c4eaf51466'
    });

    var mySessionCreds = {
        'username': 'koszta',
        'key': '26d4be2bd21e948ce97bf525f2359af2'
    };

    return function (req, res, next) {

        lfm.setSessionCredentials(mySessionCreds.username, mySessionCreds.key);

        lfm.setSessionCredentials(mySessionCreds.username, mySessionCreds.key);

        var authUrl = lfm.getAuthenticationUrl({'cb': 'http://example.com/auth'});
       // console.log(authUrl); // redirect the user to this URL

        res.tpl.lfm = lfm;

        return next();
    };

};

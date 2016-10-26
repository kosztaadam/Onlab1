/**
 * Created by Koszta Ádám on 2016. 04. 01..
 */

var authMW = require('../middleware/auth');
var getSimilarMW = require('../middleware/getSimilar');
var getParametersMW = require('../middleware/getParameters');
var getArtistInfoMW = require('../middleware/getArtistInfo');
var getTopAlbumMW = require('../middleware/getTopAlbum');
var getTopTracksMW = require('../middleware/getTopTracks');

var renderMW = require('../middleware/render');


module.exports = function(app) {

    /**
     * Graf rajzolas
     */

    app.get('/graph',
        authMW(),
        getParametersMW(),
		getArtistInfoMW(),
        getTopAlbumMW(),
        getTopTracksMW(),
        getSimilarMW(),
        renderMW('graph')
    );

    app.post('/graph/:artistid', function (req, res, next) {
        console.log("Post artist: " + req.body.artistid);
        return res.redirect('/graph/' + req.body.artistid);
    });

    app.get('/graph/:artist', function(req, res, next) {
            res.tpl.artist = req.params.artist;
            return next();
        },
        authMW(),
        getParametersMW(),
        getArtistInfoMW(),
        getTopAlbumMW(),
        getTopTracksMW(),
        getSimilarMW(),
        renderMW('graph')
    );

};
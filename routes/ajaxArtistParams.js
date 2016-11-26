/**
 * Created by Koszta Ádám on 2016. 11. 23..
 */

var authMW = require('../middleware/auth');
var getSimilarMW = require('../middleware/getSimilar');
var getArtistInfoMW = require('../middleware/getArtistInfo');
var getTopAlbumMW = require('../middleware/getTopAlbum');
var getTopTracksMW = require('../middleware/getTopTracks');

var renderMW = require('../middleware/render');


module.exports = function (app) {

    app.get('/html/artist/:artist', function (req, res, next) {
            res.tpl.artist = req.params.artist;
            res.tpl.limit = 3;
            res.tpl.deep = 1;
            return next();
        },
        authMW(),
        getArtistInfoMW(),
        getTopAlbumMW(),
        getTopTracksMW(),
        getSimilarMW(),
        renderMW('artistInfo')
    );

    app.get('/json/artist/:artist', function (req, res, next) {
            res.tpl.artist = req.params.artist;
            res.tpl.limit = 3;
            res.tpl.deep = 1;
            return next();
        },
        authMW(),
        getArtistInfoMW(),
        getTopAlbumMW(),
        getTopTracksMW(),
        getSimilarMW(),
        renderMW('artistGraph')
    );


};
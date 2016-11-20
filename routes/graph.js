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

    app.get('/',
        authMW(),
        function (req, res, next) {
            console.log("get sima");
            return next();
        },
        getParametersMW(),
		getArtistInfoMW(),
        getTopAlbumMW(),
        getTopTracksMW(),
        getSimilarMW(),
        renderMW('graph')
    );

    app.post('/:artist', function (req, res, next) {
        console.log("Post artist: " + req.body.artist);
        console.log("Post limit: " + req.body.limit);
        console.log("Post deep: " + req.body.deep);
            res.tpl.artist = req.body.artist;
            res.tpl.limit = req.body.limit;
            res.tpl.deep = req.body.deep;
            return res.redirect('/artist/' + req.body.artist + '/' + req.body.limit + '/' + req.body.deep);
        }
        //return res.redirect('/' + req.body.artist);
    );

    app.get('/artist/:artist/:limit/:deep', function(req, res, next) {
            res.tpl.artist = req.params.artist;
            res.tpl.limit = req.params.limit;
            res.tpl.deep = req.params.deep;
            return next();
        },
        function (req, res, next) {
            console.log("artist");
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


/*
     app.post('/graph/:artistid', function (req, res, next) {
         console.log("Post artist: " + req.body.artistid);
         return res.redirect('/' + req.body.artistid);
     });

    app.get('/artist/:artist', function(req, res, next) {
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
*/
};
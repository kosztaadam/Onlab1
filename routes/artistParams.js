/**
 * Created by Koszta Ádám on 2016. 04. 01..
 */

var authMW = require('../middleware/auth');
var getSimilarMW = require('../middleware/getSimilar');
var getArtistInfoMW = require('../middleware/getArtistInfo');
var getTopAlbumMW = require('../middleware/getTopAlbum');
var getTopTracksMW = require('../middleware/getTopTracks');

var renderMW = require('../middleware/render');


module.exports = function (app) {

    /**
     * Alap eloado lekerdezese
     */

    app.get('/artist/',function (req, res, next) {
            var defaultArtist = 'The Killers';
            return res.redirect('/artist/' + defaultArtist);
        }
    );

    /**
     * Eloado post feldolgozasa, majd tovabbitas get-re
     */

    app.post('/artist/:artist', function (req, res, next) {
            return res.redirect('/artist/' +
                req.body.artist + '/' +
                req.body.limit + '/' +
                req.body.deep);
        }
    );

    /**
     * Ures eloado post feldolgozasa, majd tovabbitas get-re
     */

    app.post('/artist/', function (req, res, next) {
            var defaultArtist = 'The Killers';
            return res.redirect('/artist/' + defaultArtist);
        }
    );

    /**
     * Eloado lekerdezese megadott limittel es melyseggel
     */

    app.get('/artist/:artist/:limit/:deep', function (req, res, next) {
            res.tpl.artist = req.params.artist;
            res.tpl.limit = req.params.limit;
            res.tpl.deep = req.params.deep;
            return next();
        },
        authMW(),
        getArtistInfoMW(),
        getTopAlbumMW(),
        getTopTracksMW(),
        getSimilarMW(),
        renderMW('index')
    );

    /**
     * Eloado lekerdezese alap limit es melyseg parameterrel
     */

    app.get('/artist/:artist', function (req, res, next) {
            res.tpl.artist = req.params.artist;
            return next();
        },
        authMW(),
        getArtistInfoMW(),
        getTopAlbumMW(),
        getTopTracksMW(),
        getSimilarMW(),
        renderMW('index')
    );

};
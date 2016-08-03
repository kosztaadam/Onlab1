/**
 * Created by Koszta Ádám on 2016. 04. 01..
 */

var authMW = require('../middleware/auth');
var getSimilarMW = require('../middleware/getSimilar');
var getParametersMW = require('../middleware/getParameters');
var getArtistInfoMW = require('../middleware/getArtistInfo');

var renderMW = require('../middleware/render');


module.exports = function(app) {

    /**
     * Hasonlo eloadok listazasa (killers kezdoertek)
     */

    app.get('/',  function (req, res, next) {
		return res.redirect('/artist/' + 'The Killers');
	});

    /**
     * Hasonlo eloadok lekerdezese
     */

    app.get('/artist/:artist', function(req, res, next) {
        res.tpl.artist = req.params.artist;
        //console.log(res.tpl.artist);
        return next();
    },
        authMW(),
        getParametersMW(),
        getArtistInfoMW(),
        getSimilarMW(),
        renderMW('index')
    );

    /**
     * Az eloadorol info lekerdezese
     */

    app.get('/info/:artist', function(req, res, next) {
            res.tpl.artist = req.params.artist;
            return next();
        },
        authMW(),
        getParametersMW(),
        getArtistInfoMW(),
        getSimilarMW(),
        renderMW('index')
    );
    
    app.post('/artist/:artistid', function (req, res, next) {
	    console.log("Post artist: " + req.body.artistid);
		return res.redirect('/artist/' + req.body.artistid);
    });


};
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
     * Graf rajzolas
     */

    app.get('/sigma',
        authMW(),
        getParametersMW(),
		getArtistInfoMW(),
        getSimilarMW(),
        renderMW('sigma')
    );

};
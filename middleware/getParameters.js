/**
 * Created by Koszta Ádám on 2016. 04. 10..
 */

/**
 * Ha ures parameter lenne, akkor britney
 * Page Title beallitas
 */


var LastfmAPI = require('lastfmapi');

module.exports = function () {

    return function (req, res, next) {
        res.tpl.pageTitle = "Artist List";

        /**
         * Ha ures lenne, akkor britney
         */

        if (res.tpl.artist === undefined) {
            res.tpl.artist = 'The Killers';
        }

        res.tpl.list = [];
        res.tpl.i = 0;
        res.tpl.artistList = [];

        return next();
    };

};
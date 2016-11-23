/**
 * Created by Koszta Ádám on 2016. 05. 08..
 */

module.exports = function () {

    return function (req, res, next) {

        var artistName = res.tpl.artist;

        lfm = res.tpl.lfm;

        lfm.artist.getTopAlbums({
            'artist': artistName,
            'limit' : '1'

        }, function (err, topAlbums) {
            if (err) {
                return console.log('We\'re in trouble in getTopAlbum', err);
            }

            res.tpl.artistTopAlbum = topAlbums.album[0].name;

            return next();
        });

    };

};
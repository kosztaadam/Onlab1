/**
 * Created by Koszta Ádám on 2016. 05. 08..
 */

module.exports = function () {

    return function (req, res, next) {

        var artistName = res.tpl.artist;

        lfm = res.tpl.lfm;

        lfm.artist.getTopTracks({
            'artist': artistName,
            'limit' : '5'

        }, function (err, topTracks) {
            if (err) {
                return console.log('We\'re in trouble', err);
            }

            console.log(topTracks.track.name);
            res.tpl.artistTopTracks = topTracks.track;

            return next();
        });

    };

};
/**
 * Created by Koszta Ádám on 2016. 05. 08..
 */

module.exports = function () {

    return function (req, res, next) {

        var artistName = res.tpl.artist;

        lfm = res.tpl.lfm;
        var limit = 5;
        var topTrackLst = [];

        lfm.artist.getTopTracks({
            'artist': artistName,
            'limit' : limit

        }, function (err, topTracks) {
            if (err) {
                return console.log('We\'re in trouble in getTopTracks', err);
            }

            for(var i = 0; i < limit; i++) {
                topTrackLst.push(topTracks.track[i]);
            }

            res.tpl.artistTopTracks = topTrackLst;

            return next();
        });

    };

};
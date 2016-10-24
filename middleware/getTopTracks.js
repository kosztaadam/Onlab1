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
                return console.log('We\'re in trouble', err);
            }

            //res.tpl.artistTopTracks = topTracks.track;
            //console.log(topTracks.track);

            for(var i = 0; i < limit; i++) {
                topTrackLst.push(topTracks.track[i]);
            }

            res.tpl.artistTopTracks = topTrackLst;

            //console.log(res.tpl.artistTopTracks);

            return next();
        });

    };

};
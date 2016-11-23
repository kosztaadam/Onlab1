/**
 * Artist info
 * http://www.last.fm/api/show/artist.getInfo
 *
 * @returns {Function}
 */

module.exports = function () {

    return function (req, res, next) {

        var artistName = res.tpl.artist || "The Killers";

        lfm = res.tpl.lfm;

        lfm.artist.getInfo({
            'artist': artistName

        }, function (err, artist) {
            if (err) {
                return console.log('We\'re in trouble in getArtistInfo', err);
            }

            res.tpl.artistInfo = artist;
            res.tpl.artistImage = artist.image[3]['#text'];
            res.tpl.artistListeners = artist.stats.listeners;
            res.tpl.artistPlayCount = artist.stats.playcount;
            res.tpl.artist = artist.name;

            return next();
        });

    };

};
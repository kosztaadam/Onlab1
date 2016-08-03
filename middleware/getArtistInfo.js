/**
 * Artist info
 * http://www.last.fm/api/show/artist.getInfo
 *
 * @returns {Function}
 */

module.exports = function () {

    return function (req, res, next) {

        var artistName = res.tpl.artist;
        var artistImage;
        var artistStats;

        lfm = res.tpl.lfm;

        lfm.artist.getInfo({
            'artist': artistName,

        }, function (err, artist) {
            if (err) {
                return console.log('We\'re in trouble', err);
            }

            artistImage = artist.image;
            artistStats = artist.stats;

            res.tpl.artistInfo = artist;
            res.tpl.artistImage = artistImage[3]['#text'];
            res.tpl.artistListeners = artistStats.listeners;
            res.tpl.artistPlayCount= artistStats.playcount;
			res.tpl.artist = artist.name;
			

           // console.log(artist);

            return next();
        });

    };

};
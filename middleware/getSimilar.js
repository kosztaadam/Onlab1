module.exports = function () {

    /**
     * A hasonlo eloadok lekerese
     * Az artist paramterbol jon
     */

    return function (req, res, next) {

        var similarArtistsList = [];
        var artistName;

        if (res.tpl.similarArtistsList == null) {
            artistName = res.tpl.artist;
        }
        else {
            artistName = res.tpl.list[0][res.tpl.i].name;
            res.tpl.i++;
        }

        res.tpl.artistList.push(artistName);
        console.log(res.tpl.artistList)

        lfm = res.tpl.lfm;

        lfm.artist.getSimilar({
                'artist': artistName,
                'limit': '5'

        }, function (err, similarArtists) {
                if (err) {
                    return console.log('We\'re in trouble', err);
                }

                /**
                 * Console-ra kiirja a neveket
                 */

                similarArtistsList = similarArtists.artist;

                res.tpl.similarArtistsList = similarArtistsList;
                res.tpl.similarArtistsListLength = similarArtistsList.length;

                res.tpl.list.push(similarArtistsList);

                console.log("----");

                return next();
        });

    };

};
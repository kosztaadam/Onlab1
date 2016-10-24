module.exports = function () {

    /**
     * A hasonlo eloadok lekerese
     * Az artist paramterbol jon
     */

    return function (req, res, next) {

        var alreadyprocessed = [];
        var mit = [1,2,3];
        var nextmit = [];

        var deep=5;

        function getNextItem(finalcb){
            var most = mit.pop();

            if (alreadyprocessed.indexOf(most)){
                if (mit.length > 0){
                    setTimeout(function(){
                            getNextItem(finalcb);
                    },0);
                    return;
                }else{
                    setTimeout(function(){
                            finalcb(finalcb);
                    },0);
                    return;
                }
            }

            setTimeout(function(){
                alreadyprocessed.push(most);
                nextmit.push(..);
                if (mit.length > 0){
                    setTimeout(function(){
                            getNextItem(finalcb);
                    },0);
                    return;
                }else{
                    setTimeout(function(){
                            finalcb(finalcb);
                    },0);
                    return;
                }
            },1000);
        }

        function goDeep(cb){
             getNextItem(function(){
                if (deep>0){
                    deep--;
                    mit=nextmit;
                    nextmit=[];
                    return goDeep(cb);
                }else{
                    return cb();
                }
            })
        }

       

/*
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


                similarArtistsList = similarArtists.artist;

                res.tpl.similarArtistsList = similarArtistsList;
                res.tpl.similarArtistsListLength = similarArtistsList.length;

                res.tpl.list.push(similarArtistsList);

                console.log("----");

                return next();
        });
*/
    };

};
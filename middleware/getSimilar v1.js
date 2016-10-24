module.exports = function () {

    /**
     * A hasonlo eloadok lekerese
     * Az artist paramterbol jon
     */

    return function (req, res, next) {

        var artistName;

        if (res.tpl.similarArtistsList == null) {
            artistName = res.tpl.artist;
        }
        else {
            console.log("error");
        }

        //res.tpl.artistList.push(artistName);

        lfm = res.tpl.lfm;

        var similarArtistListFinal = [];

        var alreadyprocessed = [];
        var mit = [];
        var nextmit = [];

        var deep = 2;

        function addResArtist(currentArtistName, artistLists) {
            similarArtistListFinal[currentArtistName] = artistLists;
            console.log(artistLists);
        }

        function addItem(artistName, cb) {
            console.log("artistName: " + artistName);
            lfm.artist.getSimilar({
                    'artist': artistName,
                    'limit': '2'

                }, function (err, similarArtists) {
                    if (err) {
                        return console.log('We\'re in trouble', err);
                    }
                    setTimeout(function(){
                        addResArtist(artistName, similarArtists.artist);
                    },0);
                    return cb(similarArtists.artist);
                    //taroljuk.push(similarArtists.artist);
                    
                }
            );
        }

        function getNextItem(finalcb){

            //console.log(mit);

            if(mit.length > 0)
                var most = mit.pop();
            else
                return finalcb();

            console.log("most: " + most.name);

            //console.log(alreadyprocessed.indexOf(most.name));

            var alreadyProcessedNames = [];

            alreadyprocessed.forEach(function(item) {
                alreadyProcessedNames.push(item.name);
            });

            if (alreadyProcessedNames.indexOf(most.name) != -1){
                //console.log("volt mar: " + most.name);
                if (mit.length > 0){
                    setTimeout(function(){
                            getNextItem(finalcb);
                    },0);
                    return;
                } else{
                    setTimeout(function(){
                            finalcb(finalcb);
                    },0);
                    return;
                }
            }

            setTimeout(function(){
                alreadyprocessed.push(most);
                //console.log(alreadyprocessed);

                addItem(most.name, function(cb) {
                    nextmit.push(cb);

                    //console.log("cb: " + cb);
                   // console.log(nextmit[0]);

                    //addResArtist(most, cb);

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
                });
            },1000);
        }

        function goDeep(cb){
             getNextItem(function(){
                 console.log("deep: " + deep);
                if (deep > 0){
                    deep--;
                    mit=nextmit[0];
                    nextmit=[];
                    //console.log(res.tpl.list);
                    return goDeep(cb);
                } else{
                    return cb();
                }
            })
        }

        //console.log(res.tpl.artistInfo);

        mit.push(res.tpl.artistInfo);

            goDeep(function(){
                res.tpl.similarArtistsList = alreadyprocessed;
                res.tpl.similarArtistsListLength = alreadyprocessed.length;

                console.log(similarArtistListFinal);

                return next();
            });


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
                //console.log(res.tpl.list);

                console.log("----");

                return next();
        });
*/
    };

};
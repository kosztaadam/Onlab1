var fs = require('fs');

module.exports = function () {

    /**
     * A hasonlo eloadok lekerese
     * Az artist paramterbol jon
     */

    return function (req, res, next) {
        if (typeof res.tpl.artistInfo == 'undefined') {
            console.log("error");
            return next();
        }

        var lfm = res.tpl.lfm;

        var mit = [];
        var nextmit = [];
        var deep = 1;
        var alreadyProcessedNames = [];
        var hasonlolista = [];
        var group = 0;
        var limit = 3;

        mit.push(res.tpl.artistInfo);

        function getNextItem(finalcb) {
            var most = null;

            if (mit.length > 0) {
                most = mit.pop();
            } else {
                return finalcb();
            }

            console.log("most: " + most.name);

            if (alreadyProcessedNames.indexOf(most.name) != -1) {
                setTimeout(function () {
                    getNextItem(finalcb);
                }, 0);
                return;
            }

            alreadyProcessedNames.push(most.name);

            lfm.artist.getSimilar({
                'artist': most.name,
                'limit': limit

            }, function (err, similarArtists) {
                if (err) {
                    return console.log('We\'re in trouble', err);
                }

                hasonlolista[most.name] = {};
                hasonlolista[most.name].similarArtist = [];
                hasonlolista[most.name].group = group;
                similarArtists.artist.forEach(function (item) {
                    nextmit.push(item);
                    hasonlolista[most.name].similarArtist.push(item.name);
                });
                /*
                 var JSONObject = JSON.stringify(hasonlolista[most.name].similarArtist);

                 fs.writeFile('./cache/' + most.name + '_' + limit + '.json', JSONObject, function (err) {
                 if (err) {
                 console.log(err);
                 return next();
                 }
                 */
                return getNextItem(finalcb);
            });
        }

        function goDeep(cb) {
            getNextItem(function () {
                console.log("deep: " + deep);
                if (deep > 0) {
                    deep--;
                    mit = nextmit;
                    nextmit = [];
                    group++;
                    return goDeep(cb);
                } else {
                    return cb();
                }
            })
        }

        goDeep(function () {
            //ez itt a ki kihez lista

            var similarArtistList = {
                nodes: [],
                links: []
            };

            for (var item in hasonlolista) {
                similarArtistList.nodes.push({
                    "id": item,
                    "group": hasonlolista[item].group
                });

                hasonlolista[item].similarArtist.forEach(function (itemList) {
                    if (alreadyProcessedNames.indexOf(itemList) != -1) {
                        similarArtistList.links.push({
                            "source": item,
                            "target": itemList,
                            "value": 3
                        });
                    }
                });
            }

            res.tpl.similarArtistsList = JSON.stringify(similarArtistList);

            return next();
        });

    };

};
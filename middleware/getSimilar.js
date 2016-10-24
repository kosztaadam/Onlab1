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
      var deep = 3;
      var alreadyProcessedNames = [];
      var hasonlolista = [];

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
            'limit': '2'

          }, function (err, similarArtists) {
            if (err) {
              return console.log('We\'re in trouble', err);
            }

            hasonlolista[most.name] = [];
            similarArtists.artist.forEach(function (item) {
              nextmit.push(item);
              hasonlolista[most.name].push(item.name);
            });

            return getNextItem(finalcb);
          }
        );
      }

      function goDeep(cb) {
        getNextItem(function () {
          console.log("deep: " + deep);
          if (deep > 0) {
            deep--;
            mit = nextmit;
            nextmit = [];
            return goDeep(cb);
          } else {
            return cb();
          }
        })
      }

      goDeep(function () {
        //ez itt a ki kihez lista
        //console.log(hasonlolista);

        res.tpl.similarArtistsList = hasonlolista;

        //console.log(res.tpl.similarArtistsList);
/*
        for (var item in hasonlolista) {
          console.log(item);
        }
*/

        return next();
      });
    };

  };
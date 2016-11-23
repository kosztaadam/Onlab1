/**
 * Created by Koszta Ádám on 2016. 04. 01..
 */


module.exports = function (viewName) {

    return function (req, res) {

        // Set page title
       res.tpl.pageTitle = res.tpl.artist;

       if(viewName == 'artistGraph')
           res.json(res.tpl.similarArtistsList);
       else
           res.render(viewName, res.tpl);
    };

};
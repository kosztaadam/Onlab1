/**
 * Created by Koszta Ádám on 2016. 11. 23..
 */


module.exports = function(app) {

    app.get('/', function (req, res, next) {
            res.redirect('/artist');
        }
    );
};
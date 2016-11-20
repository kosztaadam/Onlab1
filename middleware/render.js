/**
 * Created by Koszta Ádám on 2016. 04. 01..
 */


module.exports = function (viewName) {

    return function (req, res) {
       // console.log('Artist: ' +  res.tpl.artist);
	   
	   if(viewName == 'graph') {
		res.tpl.pageTitle = res.tpl.artist;
		}
       res.render(viewName, res.tpl);
    };

};
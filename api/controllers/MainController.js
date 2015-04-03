/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	news: function(req, res) {
		var id = req.param('id'),
			criteria = {}
		;
		if (typeof(id) === 'undefined' || id == null) {
			criteria = {};
		} else {
			criteria = {
				id: id
			}
		}
		News.find(criteria)
			.sort({createdAt: 'desc'})
			.exec(function(err, news) {
				if (err) {
					sails.log.error('ST >>ERROR: MainController.news()');
					sails.log.error(err);
					return res.serverError();
				}
				return res.view('main/news.ejs', {news: news});
			});
	},

	home: function(req, res) {
		sails.controllers.main.news(req, res);
	}
		
};


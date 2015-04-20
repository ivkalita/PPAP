/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	news: function(req, res) {
		var id = req.param('id'),
			criteria = {},
			page = req.param('page') || 1
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
			.paginate({page: page, limit: 10})
			.exec(function(err, news) {
				if (err) {
					sails.log.error('ST >>ERROR: MainController.news()');
					sails.log.error(err);
					return res.serverError();
				}
				News.count().exec(function(err, cnt) {
					if (err) {
						sails.log.error('ST >>ERROR: MainController.news()');
						sails.log.error(err);
						return res.serverError;
					}
					var pageCnt = cnt % 10 === 0 ? cnt / 10 : (cnt - cnt % 10) / 10 + 1;
					if (id) {
						return res.view('news/show.ejs', {
							item: news[0]
						});
					} else {
						return res.view('main/news.ejs', {
							news: news,
							page: parseInt(page),
							pageCnt: pageCnt
						});
					}
				});
			});
	},

	users: function(req, res) {
		var page = req.param('page') || 1;
		User.find()
			.paginate({page: page, limit: 10})
			.exec(function(err, users) {
			if (err) {
				sails.log.error('ST >>ERROR:MainController.users()');
				sails.log.error(err);
				return res.serverError();
			}
			User.count().exec(function(err, cnt) {
				if (err) {
					sails.log.error('ST >>ERROR:MainController.users()');
					sails.log.error(err);
					return res.serverError();
				}
				var pageCnt = cnt % 10 === 0 ? cnt / 10 : (cnt - cnt % 10) / 10 + 1;
				return res.view('main/users.ejs', {
					users: users,
					page: parseInt(page),
					pageCnt: pageCnt
				});
			});
		});
	},

	home: function(req, res) {
		sails.controllers.main.news(req, res);
	}
};


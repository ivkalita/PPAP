/**
 * NewsController
 *
 * @description :: Server-side logic for managing News
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) {
		News.find()
			.sort({createdAt: 'desc'})
			.exec(function(err, news) {
				if (err) {
					sails.log.error('ST WARN: NewsController.index()');
					return res.serverError();
				}
				return res.view('admin/news/index.ejs', {news: news});
			});
	},

	create: function(req, res) {
		News.create(req.body, function(err, news) {
			if (err) {
				sails.log.error('ST >>ERROR: NewsController.create()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		});
	},

	update: function(req, res) {
		News.update({id: req.body.id}, req.body, function(err, news) {
			if (err) {
				sails.log.error('ST >>ERROR: NewsController.update()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		});
	},

	destroy: function(req, res) {
		News.destroy({id: req.body.id}, function(err) {
			if (err) {
				sails.log.error('ST >>ERROR: NewsController.destroy()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		})
	},

	get: function(req, res) {
		News.find({id: req.body.id})
			.exec(function(err, news) {
				if (err) {
					sails.log.error('ST >>ERROR: NewsController.get()');
					sails.log.error(err);
					return res.serverError();
				}
				if (news.length < 1) {
					sails.log.warn('ST >>WARN: NewsController.get()');
					sails.log.warn('id =', req.body.id, 'news count =', news.length);
					return res.badRequest();
				}
				return res.ok(news[0]);
			});
	},

	ckeditorImageUpload: function(req, res) {
		var relPath = '/uploads/news/ckeditor',
			path = require('path')
		;
		req.file('upload').upload({
			dirname: process.cwd() + relPath
		}, function(err, uploadedFiles) {
			var file = uploadedFiles[0];
			if (err) {
				sails.log.error('ST >>ERROR: NewsController.ckeditorImageUpload()');
				sails.log.error(err);
				return res.serverError();
			}
			var html = "";
			html += "<script type='text/javascript'>";
			html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
			html += "    var url     = \"" + relPath + "/" + path.basename(file.fd) + "\";";
			html += "    var message = \"Uploaded file successfully\";";
			html += "";
			html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
			html += "</script>";
			res.send(html);
		});
	}

};


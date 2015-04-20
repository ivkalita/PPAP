/**
 * ProfileController
 *
 * @description :: Server-side logic for managing Profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) {
		var userId = req.param('id');
		if (!userId) {
			if (req.session.hasOwnProperty('me') && req.session.me.hasOwnProperty('id')) {
				userId = req.session.me.id;
			} else {
				sails.log.warn('ST >>WARN: ProfileController.index()');
				sails.log.warn('No info of user');
				return res.redirect('/');
			}
		}
		User.find({id: userId})
			.populate('education')
			.populate('work')
			.populate('contacts')
			.populate('publications')
			.exec(function(err, users) {
				if (err) {
					sails.log.error('ST >>ERROR: ProfileController.index()');
					sails.log.error(err);
					return res.serverError();
				}
				if (users.length === 0) {
					sails.log.warn('ST >>WARN: ProfileController.index()');
					sails.log.warn('Not found');
					return res.notFound();
				}
				return res.view('profile/index.ejs', {user: users[0]});
			});
	},

	profileEdit: function(req, res) {
		var userId;
		if (req.session.hasOwnProperty('me') && req.session.me.hasOwnProperty('id')) {
			userId = req.session.me.id;
		} else {
			sails.log.warn('ST >>WARN: ProfileController.profileEdit()');
			sails.log.warn('No info of user');
			return res.redirect('/');
		}
		User.find({id: userId})
			.populate('education')
			.populate('work')
			.populate('contacts')
			.populate('publications')
			.exec(function(err, users) {
				if (err) {
					sails.log.error('ST >>ERROR: ProfileController.profileEdit()');
					sails.log.error(err);
					return res.serverError();
				}
				if (users.length === 0) {
					sails.log.warn('ST >>WARN: ProfileController.profileEdit()');
					sails.log.warn('Not found');
					return res.notFound();
				}
				return res.view('profile/edit.ejs', {user:users[0]});
			});
	},

	getUser: function(req, res) {
		User.find({id: req.session.me.id}).exec(function(err, users) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.getUser()');
				sails.log.error(err);
				return res.serverError();
			}
			if (users.length === 0) {
				sails.log.warn('ST >>WARN: ProfileController.getUser()');
				sails.log.warn('User not found');
				return res.notFound();
			}
			return res.ok({
				id: users[0].id,
				firstName: users[0].firstName,
				lastName: users[0].lastName,
				middleName: users[0].middleName,
				birthday: Helper.convertDate(req, users[0].birthday, 'input-date')
			});
		});
	},

	updateUser: function(req, res) {
		var userId = req.session.me.id,
			data = {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				middleName: req.body.middleName,
				birthday: req.body.birthday
			}
		;
		if (req.body.password) {
			var bcrypt = require('bcrypt'),
				salt = bcrypt.genSaltSync(10),
				hash = bcrypt.hashSync(req.body.password, salt)
			;
			data.password = hash;
		}
		User.update({id: userId}, data).exec(function(err, user) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.updateUser()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		});
	},

	getEducation: function(req, res) {
		var id = req.param('id'),
			userId = req.session.me.id
		;
		Education.find({id: id}).exec(function(err, educations) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.getEducation()');
				sails.log.error(err);
				return res.serverError();
			}
			if (educations.length === 0 || educations[0].user !== userId) {
				sails.log.warn('ST >>WARN: ProfileController.getEducation()');
				sails.log.warn('education not found');
				return res.notFound();
			}
			return res.ok({
				id: educations[0].id,
				place: educations[0].place,
				info: educations[0].info
			});
		});
	},

	updateEducation: function(req, res) {
		var id = req.body.id,
			userId = req.session.me.id,
			data = {
				place: req.body.place,
				info: req.body.info,
				user: userId
			}
		;
		Education.update({id: id, user: userId}, data).exec(function(err, educations) {
			console.log(educations);
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.updateEducation()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		})
	},

	postEducation: function(req, res) {
		var userId = req.session.me.id,
			data = {
				place: req.body.place,
				info: req.body.info,
				user: userId
			}
		;
		Education.create(data).exec(function(err, education) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.postEducation()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		});
	},

	deleteEducation: function(req, res) {
		var userId = req.session.me.id,
			id = req.body.id
		;
		Education.destroy({id: id, user: userId}).exec(function(err) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.deleteEducation()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		});
	},

	getWork: function(req, res) {
		var id = req.param('id'),
			userId = req.session.me.id
		;
		Work.find({id: id}).exec(function(err, works) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.getWork()');
				sails.log.error(err);
				return res.serverError();
			}
			if (works.length === 0 || works[0].user !== userId) {
				sails.log.warn('ST >>Warn: ProfileController.getWork()');
				sails.log.warn('work not found');
				return res.notFound();
			}
			return res.ok({
				id: works[0].id,
				place: works[0].place,
				rank: works[0].rank,
				startedAt: Helper.convertDate(req, works[0].startedAt, 'input-date'),
				endedAt: Helper.convertDate(req, works[0].endedAt, 'input-date')
			});
		});
	},

	updateWork: function(req, res) {
		var userId = req.session.me.id,
			id = req.body.id,
			data = {
				place: req.body.place,
				rank: req.body.rank,
				startedAt: req.body.startedAt,
				endedAt: req.body.endedAt ? req.body.endedAt : undefined,
				user: userId
			}
		;
		Work.update({id: id, user: userId}, data).exec(function(err, works) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.updateWork()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		});
	},

	deleteWork: function(req, res) {
		var userId = req.session.me.id,
			id = req.body.id
		;
		Work.destroy({id: id, user: userId}).exec(function(err) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.deleteWork()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		});
	},

	postWork: function(req, res) {
		var userId = req.session.me.id,
			data = {
				place: req.body.place,
				rank: req.body.rank,
				startedAt: req.body.startedAt,
				endedAt: req.body.endedAt,
				user: userId
			}
		;
		Work.create(data).exec(function(err, work) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.postWork()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		});
	},

	getPublication: function(req, res) {
		var id = req.param('id'),
			userId = req.session.me.id
		;
		Publication.find({id: id}).exec(function(err, publications) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.getPublication()');
				sails.log.error(err);
				return res.serverError();
			}
			if (publications.length === 0 || publications[0].user !== userId) {
				sails.log.warn('ST >>Warn: ProfileController.getPublication()');
				sails.log.warn('work not found');
				return res.notFound();
			}
			return res.ok({
				id: publications[0].id,
				info: publications[0].info
			});
		});
	},

	updatePublication: function(req, res) {
		var id = req.body.id,
			userId = req.session.me.id,
			data = {
				info: req.body.info
			}
		;
		Publication.update({id: id, user: userId}, data).exec(function(err, publications) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.updatePublication()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		});
	},

	deletePublication: function(req, res) {
		var id = req.body.id,
			userId = req.session.me.id
		;
		Publication.destroy({id: id, user: userId}).exec(function(err) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.deletePublication()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		});
	},

	postPublication: function(req, res) {
		var userId = req.session.me.id,
			data = {
				info: req.body.info,
				user: userId
			}
		;
		Publication.create(data).exec(function(err, publications) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.postPublication()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		});
	},

	getAdditionalInfo: function(req, res) {
		var id = req.session.me.id;
		User.find({id: id}).exec(function(err, users) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.getAdditionalInfo()');
				sails.log.error(err);
				return res.serverError();
			}
			if (users.length === 0) {
				sails.log.warn('ST >>WARN: ProfileController.getAdditionalInfo()');
				sails.log.warn('No user found for id =', id);
				return res.notFound();
			}
			return res.ok({
				id: id,
				additionalInfo: users[0].additionalInfo
			});
		});
	},

	updateAdditionalInfo: function(req, res) {
		var id = req.session.me.id,
			data = {
				additionalInfo: req.body.additionalInfo
			}
		;
		User.update({id: id}, data).exec(function(err, users) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.updateAdditionalInfo()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		});
	},

	getContact: function(req, res) {
		var id = req.param('id'),
			userId = req.session.me.id
		;
		Contact.find({id: id}).exec(function(err, contacts) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.getContact()');
				sails.log.error(err);
				return res.serverError();
			}
			if (contacts.length === 0 || contacts[0].user !== userId) {
				sails.log.warn('ST >>Warn: ProfileController.getContact()');
				sails.log.warn('work not found');
				return res.notFound();
			}
			return res.ok({
				id: contacts[0].id,
				'type': contacts[0]['type'],
				'info': contacts[0]['info']
			});
		});
	},

	updateContact: function(req, res) {
		var id = req.body.id,
			userId = req.session.me.id,
			data = {
				'type': req.body['type'],
				'info': req.body['info']
			}
		;
		Contact.update({id: id, user: userId}, data).exec(function(err, contacts) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.updateContact()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		});
	},

	deleteContact: function(req, res) {
		var id = req.body.id,
			userId = req.session.me.id
		;
		Contact.destroy({id: id, user: userId}).exec(function(err) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.deleteContact()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		});
	},

	postContact: function(req, res) {
		var userId = req.session.me.id,
			data = {
				'type': req.body['type'],
				'info': req.body['info'],
				user: userId
			}
		;
		Contact.create(data).exec(function(err, contacts) {
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.postContact()');
				sails.log.error(err);
				return res.serverError();
			}
			return res.ok();
		});
	},

	postAvatar: function(req, res) {
		var relPath = '/uploads/users/',
			path = require('path'),
			userId = req.session.me.id
		;
		req.file('avatar').upload({
			dirname: process.cwd() + relPath
		}, function(err, uploadedFiles) {
			var file = uploadedFiles[0];
			if (err) {
				sails.log.error('ST >>ERROR: ProfileController.postAvatar()');
				sails.log.error(err);
				return res.serverError();
			}
			User.update({id: userId}, {avatar: relPath + path.basename(file.fd)}).exec(function(err, users) {
				if (err) {
					sails.log.error('ST >>ERROR: ProfileController.postAvatar()');
					sails.log.error(err);
					return res.serverError();
				}
				setTimeout(function() {
					return res.redirect('/profile/edit');
				}, 6000);
			});
		});
	}
};


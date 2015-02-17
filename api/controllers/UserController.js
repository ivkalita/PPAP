/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	login: function(req, res) { //метод для авторизации существующего пользователя
		//проверим на валидность введенные данные (файл /api/services/Validator.js)
		var valid = Validator.check(req.body, {
			login: {
				endpoint: true,
				type: 'string'
			},
			password: {
				endpoint: true,
				type: 'string'
			}
		});
		//если что-то не то, то сообщаем об этом пользователю
		if (valid.err) {
			sails.log.warn('ST: >>WARN: UserController.login(req, res)');
			sails.log.warn('REQUEST VALIDATION ERROR');
			sails.log.warn(valid.err);
			return res.badRequest(Helper.translate(req, 'bad-user-credentials'));
		}
		//иначе, пробуем авторизоваться
		var credentials = {
			login: req.body.login,
			password: req.body.password
		}
		User.login(credentials, function(err, user) {
			if (err) {
				sails.log.error('ST: ERROR: UserController.login(req, res)');
				sails.log.error('User.login failed');
				sails.log.error(err);
				return res.serverError(Helper.translate(req, 'server-error'));
			}
			//если такого пользователя не существует, то метод login возвращает callback-у в качестве второго аргумента null
			if (user == null) {
				return res.authorizationRequired(Helper.translate(req, 'bad-user-credentials'));
			}
			//иначе сохраняем информацию о пользователе в сессию
			req.session.me = {
				id: user.id,
				firstName: user.firstName,
				middleName: user.middleName,
				lastName: user.lastName
			}
			return res.redirect('/');
		});
	},
	logout: function(req, res) {
		//Если пользователь авторизован, то удаляем информацию о его сессии
		if (req.session.hasOwnProperty('me')) {
			delete req.session.me;
		}
		return res.redirect('/');

	},
	signup: function(req, res) {
		//проверяем на валидность введенные данные
		var valid = Validator.check(req.body, {
			login: {
				endpoint: true,
				type: 'string'
			},
			password: {
				endpoint: true,
				type: 'string'
			},
			firstName: {
				endpoint: true,
				type: 'string'
			},
			lastName: {
				endpoint: true,
				type: 'string'
			},
			middleName: {
				endpoint: true,
				type: 'string'
			}
		});
		if (valid.err) {
			sails.log.warn('ST >>WARN: UserController.signup(req, res)');
			sails.log.warn('REQUEST VALIDATION ERROR');
			sails.log.warn(valid.err);
			return res.badRequest(Helper.translate(req, 'bad-user-credentials'));
		}
		//пытаемся зарегистрировать нового пользователя
		var credentials = {
			login: req.body.login,
			password: req.body.password,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			middleName: req.body.middleName
		}
		User.signup(credentials, function(err, user) {
			//тут отловим системные ошибки
			if (err) {
				sails.log.error('ST ERROR: UserController.signup(req, res)');
				sails.log.error('User.signup() failed');
				sails.log.error(err);
				return res.serverError(Helper.translate(req, 'server-error'));
			}
			//а тут - ошибки валидации
			if (user == null) {
				sails.log.warn('ST WARN: UserController.signup(req, res)');
				sails.log.warn('User.signup() validation failed');
				return res.badRequest(Helper.translate(req, 'bad-user-credentials'));
			}

			//если зарегистрировались, то авторизуем пользователя
			req.session.me = {
				id: user.id,
				firstName: user.firstName,
				middleName: user.middleName,
				lastName: user.lastName
			}
			return res.redirect('/');
		});
	},
	locale: function(req, res) {
		req.session.locale = req.param('locale');
		return res.redirect('/');
	}
};


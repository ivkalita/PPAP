/**
 * MainController
 *
 * @description :: Server-side logic for managing Mains
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	test: function(req, res) {
		//sails.log.info
		//sails.log.error
		//sails.log.silly
		//sails.log.debug
		// sails.log.info(req);
		// sails.log.info('------------------');
		// sails.log.info(res);
		//return res.view('homepage');
		//return res.redirect('www.google.ru');
		//res.ok()
		return res.view('testSignup');
		//res.serverError();
		//res.badRequest();
		// return res.ok('Hello world');
	},
	insertUser: function(req, res) {
		var elem = req.body.elem;
		User.create({login: elem.login}, function(err, user) {
			if (err) {
				sails.log.error(err);
				return res.serverError(err);
			}
			return res.ok({user: user.id});		
		});
	}
	
};


/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */
module.exports.routes = {

	/***************************************************************************
	*                                                                          *
	* Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
	* etc. depending on your default view engine) your home page.              *
	*                                                                          *
	* (Alternatively, remove this and add an `index.html` file in your         *
	* `assets` directory)                                                      *
	*                                                                          *
	***************************************************************************/

	'/': {
		controller: 'main',
		action: 'home'
	},

	//USER
	'get /login': {
		view: 'login'
	},

	'get /signup': {
		view: 'signup'
	},

	'post /login': {
		controller: 'user',
		action: 'login'
	},

	'post /signup': {
		controller: 'user',
		action: 'signup'
	},

	'/logout': {
		controller: 'user',
		action: 'logout'
	},

	'get /locale': {
		controller: 'user',
		action: 'locale'
	},

	'get /admin': {
		controller: 'admin',
		action: 'index'
	},

//admin news

	'get /admin/news': {
		controller: 'news',
		action: 'index'
	},

	'/admin/news/ckeditor/image/upload': {
		controller: 'news',
		action: 'ckeditorImageUpload'
	},

	'post /admin/news/create': {
		controller: 'news',
		action: 'create'
	},

	'post /admin/news/update': {
		controller: 'news',
		action: 'update'
	},

	'post /admin/news/destroy': {
		controller: 'news',
		action: 'destroy'
	},

	'get /admin/news/get': {
		controller: 'news',
		action: 'get'
	},

	'get /news': {
		controller: 'main',
		action: 'news'
	},

//users
	'get /users': {
		controller: 'main',
		action: 'users'
	},

//profile
	'get /profile': {
		controller: 'profile',
		action: 'index'
	},

	'get /profile/edit': {
		controller: 'profile',
		action: 'profileEdit'
	},

	'get /profile/user': {
		controller: 'profile',
		action: 'getUser'
	},

	'put /profile/user': {
		controller: 'profile',
		action: 'updateUser'
	},

	'get /profile/education': {
		controller: 'profile',
		action: 'getEducation'
	},

	'put /profile/education': {
		controller: 'profile',
		action: 'updateEducation'
	},

	'post /profile/education': {
		controller: 'profile',
		action: 'postEducation'
	},

	'delete /profile/education': {
		controller: 'profile',
		action: 'deleteEducation'
	},

	'get /profile/work': {
		controller: 'profile',
		action: 'getWork'
	},

	'put /profile/work': {
		controller: 'profile',
		action: 'updateWork'
	},

	'delete /profile/work': {
		controller: 'profile',
		action: 'deleteWork'
	},

	'post /profile/work': {
		controller: 'profile',
		action: 'postWork'
	},

	'get /profile/publication': {
		controller: 'profile',
		action: 'getPublication'
	},

	'put /profile/publication': {
		controller: 'profile',
		action: 'updatePublication'
	},

	'post /profile/publication': {
		controller: 'profile',
		action: 'postPublication'
	},

	'delete /profile/publication': {
		controller: 'profile',
		action: 'deletePublication'
	},

	'get /profile/additionalInfo': {
		controller: 'profile',
		action: 'getAdditionalInfo'
	},

	'put /profile/additionalInfo': {
		controller: 'profile',
		action: 'updateAdditionalInfo'
	},

	'get /profile/contact': {
		controller: 'profile',
		action: 'getContact'
	},

	'put /profile/contact': {
		controller: 'profile',
		action: 'updateContact'
	},

	'post /profile/contact': {
		controller: 'profile',
		action: 'postContact'
	},

	'delete /profile/contact': {
		controller: 'profile',
		action: 'deleteContact'
	},

	'post /profile/avatar': {
		controller: 'profile',
		action: 'postAvatar'
	}
	/***************************************************************************
	*                                                                          *
	* Custom routes here...                                                    *
	*                                                                          *
	*  If a request to a URL doesn't match any of the custom routes above, it  *
	* is matched against Sails route blueprints. See `config/blueprints.js`    *
	* for configuration options and examples.                                  *
	*                                                                          *
	***************************************************************************/

};

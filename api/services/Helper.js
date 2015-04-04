//lib for different common functions
var moment = require('moment');

module.exports = {
	getLocale: function(req) {
		var locale = 'ru';
		if (typeof req !== 'undefined' && req != null && req.hasOwnProperty('session') && req.session.hasOwnProperty('locale')) {
			locale = req.session.locale;
		}
		return locale;
	},

	translate: function(req, text) {
		var locale = Helper.getLocale(req);
		return sails.__({
			phrase: text,
			locale: locale
		});
	},

	convertDate: function(req, date) {
		var locale = Helper.getLocale(req);
		if (locale === 'en') {
			return moment(date).format('MM.DD.YYYY, HH:mm');
		} else {
			return moment(date).format('DD.MM.YYYY, HH:mm');
		}
	}
}
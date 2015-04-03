//lib for different common functions
module.exports = {
	translate: function(req, text) {
		var locale = 'ru';
		if (typeof req !== 'undefined' && req != null && req.hasOwnProperty('session') && req.session.hasOwnProperty('locale')) {
			locale = req.session.locale;
		}
		return sails.__({
			phrase: text,
			locale: locale
		});
	}
}
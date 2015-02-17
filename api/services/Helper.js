//lib for different common functions
module.exports = {
	translate: function(req, text) {
		var locale = 'ru';
		if (typeof req !== 'undefined' && req != null && req.hasOwnProperty('session') && req.session.hasOwnProperty('locale')) {
			locale = req.session.locale;
		}
		// sails.log.info('locale = ' + locale);
		// sails.log.info('text = ' + text);
		// sails.log.info('translated text = ' + sails.__({phrase: text, locale: locale}));
		return sails.__({
			phrase: text,
			locale: locale
		});
	}
}
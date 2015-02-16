//lib for different common functions
module.exports = {
	translate: function(req, text) {
		var locale = 'ru';
		if (req.session.hasOwnProperty('locale')) {
			locale = req.session.locale;
		}
		return sails.__({
			phrase: text,
			locale: locale
		});
	}
}
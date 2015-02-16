//module which validates request obj structure and types.
var querystring = require('querystring');
module.exports = {
	check: function(obj, structure, cb) {
		var dfs = function(obj, etalon) {
			if (etalon.hasOwnProperty('endpoint')) {
				var equal = true;
				if (etalon.hasOwnProperty('type')) {
					if ((etalon.hasOwnProperty('nullable') && !etalon['nullable']) || !etalon.hasOwnProperty('nullable')) {
						switch (etalon.type) {
							case 'integer':
								equal &= (typeof obj === 'number');
								if (etalon.hasOwnProperty('NaNable') && !etalon.NaNable) {
									equal &= ((obj % 1) === 0);
								}
								break;
							case 'string':
								var restrictedSymbols = [
									'\'', '"', '\\', '\/', '<', '>', '=', '%', '`'
								];
								restrictedSymbols.forEach(function(symb) {
									if (obj.indexOf(symb) !== -1) {
										equal = false;
									}
								});
								break;
							case 'boolean':
								equal &= (typeof obj === 'boolean');
								break;
							default:
								break;
						}
					}
					if (!equal) {
						return {result: false, obj: '', msg: 'expected type <' + etalon.type + '>'};
					}
				}
				if (etalon.hasOwnProperty('values') && etalon.values.indexOf(obj) == -1) {
					return {result: false, obj: '', msg: 'value <' + obj + '> is restricted'};
				}
				return {result: true, obj: '', msg: ''};
			}
			for (property in etalon) {
				if (!obj.hasOwnProperty(property)) {
					return {result: false, obj: property, msg: 'obj should contain this property'};
				}
				var dfsRes = dfs(obj[property], etalon[property]);
				if (!dfsRes.result) {
					return {result: false, obj: dfsRes.obj ? property + '.' + dfsRes.obj : property, msg: dfsRes.msg};
				}
			}
			return dfsRes;
		}
		var valid = dfs(obj, structure);
		valid.err = valid.result ? null : valid.obj + ' ' + valid.msg;
		if (typeof cb === 'undefined') {
			return valid;
		}
		cb(
			valid.err,
			valid.result ? obj : null
		);
	},

	isPositiveInt: function(value) {
		return (typeof value === 'number') && ((value % 1) === 0) && value > 0;
	},

	isValidString: function(value, notEmpty) {
		var valid = (typeof value === 'string');
		var restrictedSymbols = [
			'\'', '"', '\\', '\/', '<', '>', '=', '%', '`'
		];
		restrictedSymbols.forEach(function(symb) {
			if (value.indexOf(symb) !== -1) {
				valid = false;
			}
		});
		if (notEmpty && valid) {
			valid &= value !== '';
		}
		return valid;
	}
}
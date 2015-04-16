/**
* UserPublication.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName: 'publications',
	adapter: 'psqlServer',
	autoPK: false,
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			unique: true
		},
		info: {
			type: 'string',
			required: true
		},
		user: {
			model: 'user',
			required: true
		}
	}
};


/**
* UserContact.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName: 'contacts',
	adapter: 'psqlServer',
	autoPK: false,
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			unique: true
		},
		type: {
			type: 'string'
		},
		info: {
			type: 'string'
		},
		user: {
			model: 'user',
			required: true
		}
	}
};


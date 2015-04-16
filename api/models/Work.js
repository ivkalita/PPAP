/**
* UserWork.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName: 'works',
	adapter: 'psqlServer',
	autoPK: false,
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			unique: true
		},
		place: {
			type: 'string',
			required: true
		},
		rank: {
			type: 'string',
			required: true
		},
		user: {
			model: 'user',
			required: true
		},
		startedAt: {
			type: 'date'
		},
		endedAt: {
			type: 'date'
		}
	}
};


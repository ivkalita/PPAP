/**
* News.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName: 'news',
	adapter: 'psqlServer',
	autoPK: false,

	attributes: {
		id: {
			type: 'integer',
			primaryKey: true,
			autoIncrement: true,
			unique: true
		},
		title: {
			type: 'string',
			required: true
		},
		text: {
			type: 'string',
			required: true
		},
		description: {
			type: 'string',
			required: true
		},
		mainImg: {
			model: 'Image'
		}
	}
};


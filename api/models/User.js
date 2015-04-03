/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	tableName: 'users', // название таблицы в БД
	adapter: 'psqlServer', //настройки соединения с БД (файл config/connections.js)
	autoPK: false, //отключаем автоматическое определение первичного ключа
	attributes: { //поля в таблице
		id: {
			type: 'integer',
			primaryKey: true, //первичный ключ
			autoIncrement: true, //автоматическое увеличение id
			unique: true
		},
		login: {
			type: 'string',
			unique: true,
			required: true
		},
		firstName: {
			type: 'string',
			required: true
		},
		lastName: {
			type: 'string',
			required: true
		},
		middleName: {
			type: 'string'
		},
        password: {
            type: 'string',
            required: true
        },
        isAdmin: {
            type: 'integer',
            required: true
        }
	},
	//метод для регистрации нового пользователя
    signup: function(credentials, cb) {
		//bcrypt понадобится для шифрования пароля
        var bcrypt = require('bcrypt');
        //генерируем соль
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
            	sails.log.error('ST: >>ERROR: User.signup(credentials, cb)');
            	sails.log.error('bcrypt.genSalt failed');
                cb(err);
                return;
            }
            bcrypt.hash(credentials.password, salt, function(err, hash) {
                if (err) {
                	sails.log.error('ST: >>ERROR: User.signup(credentials, cb)');
                	sails.log.error('bcrypt.hash failed');
                    cb(err);
                    return;
                }
                //проверяем, нет ли такого login-а в базе
                User.count().where({login: credentials.login}).exec(function(err, cnt) {
                    if (err) {
                    	sails.log.error('ST: >>ERROR: User.signup(credentials, cb)');
                    	sails.log.error('User.count().where({}) failed');
                        cb(err);
                        return;
                    }
                    if (cnt > 0) {
                    	sails.log.warn('ST: >>WARN: User.signup(credentials, cb)');
                    	sails.log.warn('Users count for this login > 0');
                    	cb(null, null);
                        return;
                    }
                    //если все в порядке, то создаем такого пользователя
                    User.create({
                        login: credentials.login,
                        firstName: credentials.firstName,
                        lastName: credentials.lastName,
                        middleName: credentials.middleName,
                        password: hash,
                        isAdmin: 0
                    }, function(err, user) {
                        if (err) {
                            sails.log.error('ST: >>ERROR: User.signup(credentials, cb)');
                            sails.log.error('User.create failed');
                            cb(null, null);
                            return;
                        }
                        cb(null, user);
                    });
                });
            });
        });
    },
    login: function(credentials, cb) {
        var bcrypt = require('bcrypt');
        User.findOne({login: credentials.login}, function(err, user) {
            if (err) {
                sails.log.error('ST: >>ERROR: User.login(credentials, cb)');
                sails.log.error('User.findOne failed()');
                cb(err);
                return;
            }
            if (!user) {
                sails.log.warn('ST: >>WARN: User.login(credentials, cb)');
                sails.log.warn('User.findOne - no such users');
                cb(null, null);
                return;
            }
            var pass_md5 = user.password;
            bcrypt.compare(credentials.password, pass_md5, function(err, res) {
                if (err) {
                    sails.log.error('ST: >>ERROR: User.login(credentials, cb)');
                    sails.log.error('bcrypt.compare failed');
                    cb(err);
                    return;
                }
                if (res) {
                    cb(null, user);
                    return;
                } else {
                    sails.log.warn('ST: >>WARN: User.login(credentials, cb)');
                    sails.log.warn('bcrypt.compare returned false');
                    cb(null, null);
                    return;
                }
            });
        });
    },
};


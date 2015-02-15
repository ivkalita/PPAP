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
    }
  }
};


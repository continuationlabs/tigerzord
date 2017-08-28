'use strict';

const Bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.hash = function (event, context, callback) {
  if (typeof event.plainText !== 'string') {
    return callback(new TypeError('plainText must be a string'), null);
  }

  Bcrypt.hash(event.plainText, event.saltRounds || saltRounds, callback);
};

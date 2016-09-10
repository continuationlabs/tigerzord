'use strict';

const Bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports.hash = function (event, context, callback) {
  if (typeof event.plainText !== 'string') {
    return callback(new TypeError('you did not supply a plainText value to hash'), null);
  }

  Bcrypt.hash(event.plainText, event.saltRounds || saltRounds, callback);
};

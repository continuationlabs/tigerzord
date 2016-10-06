# tigerzord

[![Current Version](https://img.shields.io/npm/v/tigerzord.svg)](https://www.npmjs.org/package/tigerzord)
[![Build Status](https://travis-ci.org/continuationlabs/tigerzord.svg?branch=master)](https://travis-ci.org/continuationlabs/tigerzord)
![Dependencies](http://img.shields.io/david/continuationlabs/tigerzord.svg)

[![belly-button-style](https://cdn.rawgit.com/continuationlabs/belly-button/master/badge.svg)](https://github.com/continuationlabs/belly-button)

<img src="https://raw.github.com/continuationlabs/tigerzord/master/images/tigerzord.jpg" />

Run `bcrypt.hash()` as an AWS Lambda function. For `bcrypt.compare()` as a Lambda function, see [`dragonzord`](https://github.com/continuationlabs/dragonzord).

## API

`tigerzord` uses the Lambda function interface in the following manner:

  - `event` - The following properties are expected in the `event` argument.
    - `plainText` (string) - The value to hash.
    - `saltRounds` (number) - The number of salt rounds. This is optional, and defaults to 10.
  - `context` - Unused.
  - `callback(err, result)` - A typical Node.js error first callback. If no error occurs, `result` will be the hashed representation of `plainText`.

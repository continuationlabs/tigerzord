'use strict';

const Path = require('path');
const Aws = require('aws-sdk');
const Lambundaler = require('lambundaler');

const LAMBDA_NAME = 'tigerzord-demo';
const AWS_ROLE = 'XXXXXXX';
const AWS_CONFIG = {
  accessKeyId: 'XXXXXXX',
  secretAccessKey: 'XXXXXXX',
  region: 'XXXXXXX'
};

console.log('tigerzord deployment sequence has been initiated');

Lambundaler({
  entry: Path.resolve(__dirname, '..', 'lib', 'index.js'),
  export: 'hash',
  exclude: ['bcrypt'],
  install: {
    pkg: Path.resolve(__dirname, '..', 'package.json')
  },
  deploy: {
    config: AWS_CONFIG,
    role: AWS_ROLE,
    name: LAMBDA_NAME,
    overwrite: true,
    timeout: 30
  }
}, function bundleCb (err) {
  if (err) {
    throw err;
  }

  const lambda = new Aws.Lambda(AWS_CONFIG);
  const plainText = process.argv[2] || 'hello world';

  console.log(`value to hash: ${plainText}`);

  lambda.invoke({
    FunctionName: LAMBDA_NAME,
    Payload: JSON.stringify({ plainText })
  }, function invokeCb (err, response) {
    if (err) {
      throw err;
    }

    console.log(`lambda response code: ${response.StatusCode}`);
    console.log(`hashed value: ${response.Payload}`);
  });
});

'use strict';

const Code = require('code');
const Lab = require('lab');
const Tigerzord = require('../lib');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;

describe('tigerzord()', () => {
  it('exports a hash function', (done) => {
    expect(Tigerzord.hash).to.be.a.function();
    // Assert 3 arguments, event, context, callback
    expect(Tigerzord.hash.length).to.equal(3);
    done();
  });
  describe('hash()', () => {
    it('hashes the string supplied via event.plainText', (done) => {
      const plainText = 'testString';
      Tigerzord.hash({ plainText }, null, (err, result) => {
        expect(err).to.not.exist();
        expect(result).to.be.a.string();
        expect(result.length).to.be.greaterThan(plainText.length);
        done();
      });
    });

    it('hashes the string supplied with the number of saltRounds', (done) => {
      const plainText = 'testString';
      Tigerzord.hash({ plainText, saltRounds: 1 }, null, (err, result) => {
        expect(err).to.not.exist();
        expect(result).to.be.a.string();
        expect(result.length).to.be.greaterThan(plainText.length);
        done();
      });
    });

    it('callsback with an error if event.plainText not a string with length', (done) => {
      Tigerzord.hash({ plainText: null }, null, (err, result) => {
        expect(err).to.be.an.error(TypeError, 'you did not supply a plainText value to hash');
        expect(result).to.be.null();

        Tigerzord.hash({}, null, (err, result) => {
          expect(err).to.be.an.error(TypeError, 'you did not supply a plainText value to hash');
          expect(result).to.be.null();
          done();
        });
      });
    });
  });
});

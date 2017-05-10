'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Exchange = mongoose.model('Exchange');

/**
 * Globals
 */
var user,
  exchange;

/**
 * Unit tests
 */
describe('Exchange Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      countryCode:'+66',
      contact:9876567432,
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function () {
      exchange = new Exchange({
        currency_from: 'USD',
        amount_from: 1250,
        currency_to: 'THB',
        amount_to: 41000,
        location: 'bangkok',
        schedule: Date.now(),
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return exchange.save(function (err) {
        should.not.exist(err);
        done();
      });
    });
    // currency_from
    it('should be able to show an error when try to save without currency_from', function (done) {
      exchange.currency_from = '';

      return exchange.save(function (err) {
        should.exist(err);
        done();
      });
    });

    // amount_from
    it('should be able to show an error when try to save without amount_from', function (done) {
      exchange.amount_from = null;

      return exchange.save(function (err) {
        should.exist(err);
        done();
      });
    });

    // currency_to
    it('should be able to show an error when try to save without currency_to', function (done) {
      exchange.currency_to = '';

      return exchange.save(function (err) {
        should.exist(err);
        done();
      });
    });
    // amount_to
    it('should be able to show an error when try to save without amount_to', function (done) {
      exchange.amount_to = null;

      return exchange.save(function (err) {
        should.exist(err);
        done();
      });
    });

    // location
    it('should be able to show an error when try to save without location', function (done) {
      exchange.location = '';

      return exchange.save(function (err) {
        should.exist(err);
        done();
      });
    });

    // schedule
    it('should be able to show an error when try to save without schedule', function (done) {
      exchange.schedule = null;

      return exchange.save(function (err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Exchange.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});

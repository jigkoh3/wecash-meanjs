'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Pushnoti = mongoose.model('Pushnoti');

/**
 * Globals
 */
var user,
  pushnoti;

/**
 * Unit tests
 */
describe('Pushnoti Model Unit Tests:', function () {
  beforeEach(function (done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function () {
      pushnoti = new Pushnoti({
        user_id: 'Pushnoti user id',
        user_name: 'Pushnoti user name',
        role: 'Pushnoti role',
        device_token: 'Pushnoti device token',
        user: user
      });

      done();
    });
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(0);
      return pushnoti.save(function (err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without user id ', function (done) {
      pushnoti.user_id = '';

      return pushnoti.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without role ', function (done) {
      pushnoti.role = '';

      return pushnoti.save(function (err) {
        should.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without device token ', function (done) {
      pushnoti.device_token = '';

      return pushnoti.save(function (err) {
        should.exist(err);
        done();
      });
    });

  });

  afterEach(function (done) {
    Pushnoti.remove().exec(function () {
      User.remove().exec(function () {
        done();
      });
    });
  });
});

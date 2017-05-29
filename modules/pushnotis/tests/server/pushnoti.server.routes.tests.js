'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Pushnoti = mongoose.model('Pushnoti'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  pushnoti;

/**
 * Pushnoti routes tests
 */
describe('Pushnoti CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local',
      loginToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwibG9naW5FeHBpcmVzIjoxNDg3NTk1NTcyMzcyfQ.vfDKENoQTmzQhoaBV35RJa02f_5GVvviJdhuPhfM1oU',
      // loginExpires: tomorrow.setDate(tomorrow.getDate() + 1)
    });

    // Save a user to the test db and create new Pushnoti
    user.save(function () {
      pushnoti = {
        user_id: 'Pushnoti user id',
        user_name: 'Pushnoti user name',
        role: 'Pushnoti role',
        device_token: 'Pushnoti device token'
      };

      done();
    });
  });

  it('should be able to save a Pushnoti if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Pushnoti
        agent.post('/api/pushnotis')
          .send(pushnoti)
          .expect(200)
          .end(function (pushnotiSaveErr, pushnotiSaveRes) {
            // Handle Pushnoti save error
            if (pushnotiSaveErr) {
              return done(pushnotiSaveErr);
            }

            // Get a list of Pushnotis
            agent.get('/api/pushnotis')
              .end(function (pushnotisGetErr, pushnotisGetRes) {
                // Handle Pushnotis save error
                if (pushnotisGetErr) {
                  return done(pushnotisGetErr);
                }

                // Get Pushnotis list
                var pushnotis = pushnotisGetRes.body;

                // Set assertions
                (pushnotis[0].user._id).should.equal(userId);
                (pushnotis[0].user_id).should.match('Pushnoti user id');
                (pushnotis[0].user_name).should.match('Pushnoti user name');
                (pushnotis[0].role).should.match('Pushnoti role');
                (pushnotis[0].device_token).should.match('Pushnoti device token');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to save a Pushnoti if logged in with token', function (done) {
    pushnoti.loginToken = user.loginToken;
    // Save a new Pushnoti
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Pushnoti
        agent.post('/api/pushnotis')
          .send(pushnoti)
          .expect(200)
          .end(function (pushnotiSaveErr, pushnotiSaveRes) {
            // Handle Pushnoti save error
            if (pushnotiSaveErr) {
              return done(pushnotiSaveErr);
            }

            // Get a list of Pushnotis
            agent.get('/api/pushnotis')
              .end(function (pushnotisGetErr, pushnotisGetRes) {
                // Handle Pushnotis save error
                if (pushnotisGetErr) {
                  return done(pushnotisGetErr);
                }

                // Get Pushnotis list
                var pushnotis = pushnotisGetRes.body;

                // Set assertions
                (pushnotis[0].user._id).should.equal(userId);
                (pushnotis[0].user_id).should.match('Pushnoti user id');
                (pushnotis[0].user_name).should.match('Pushnoti user name');
                (pushnotis[0].role).should.match('Pushnoti role');
                (pushnotis[0].device_token).should.match('Pushnoti device token');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Pushnoti if no user id is provided', function (done) {
    // Invalidate name field
    pushnoti.user_id = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Pushnoti
        agent.post('/api/pushnotis')
          .send(pushnoti)
          .expect(400)
          .end(function (pushnotiSaveErr, pushnotiSaveRes) {
            // Set message assertion
            (pushnotiSaveRes.body.message).should.match('Please fill Pushnoti user id');

            // Handle Pushnoti save error
            done(pushnotiSaveErr);
          });
      });
  });

  it('should not be able to save an Pushnoti if no role is provided', function (done) {
    // Invalidate name field
    pushnoti.role = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Pushnoti
        agent.post('/api/pushnotis')
          .send(pushnoti)
          .expect(400)
          .end(function (pushnotiSaveErr, pushnotiSaveRes) {
            // Set message assertion
            (pushnotiSaveRes.body.message).should.match('Please fill Pushnoti role');

            // Handle Pushnoti save error
            done(pushnotiSaveErr);
          });
      });
  });

  it('should not be able to save an Pushnoti if no device token id is provided', function (done) {
    // Invalidate name field
    pushnoti.device_token = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Pushnoti
        agent.post('/api/pushnotis')
          .send(pushnoti)
          .expect(400)
          .end(function (pushnotiSaveErr, pushnotiSaveRes) {
            // Set message assertion
            (pushnotiSaveRes.body.message).should.match('Please fill Pushnoti device token');

            // Handle Pushnoti save error
            done(pushnotiSaveErr);
          });
      });
  });

  it('should be able to update an Pushnoti if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Pushnoti
        agent.post('/api/pushnotis')
          .send(pushnoti)
          .expect(200)
          .end(function (pushnotiSaveErr, pushnotiSaveRes) {
            // Handle Pushnoti save error
            if (pushnotiSaveErr) {
              return done(pushnotiSaveErr);
            }

            // Update Pushnoti name
            pushnoti.user_id = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Pushnoti
            agent.put('/api/pushnotis/' + pushnotiSaveRes.body._id)
              .send(pushnoti)
              .expect(200)
              .end(function (pushnotiUpdateErr, pushnotiUpdateRes) {
                // Handle Pushnoti update error
                if (pushnotiUpdateErr) {
                  return done(pushnotiUpdateErr);
                }

                // Set assertions
                (pushnotiUpdateRes.body._id).should.equal(pushnotiSaveRes.body._id);
                (pushnotiUpdateRes.body.user_id).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Pushnotis if not signed in', function (done) {
    // Create new Pushnoti model instance
    var pushnotiObj = new Pushnoti(pushnoti);

    // Save the pushnoti
    pushnotiObj.save(function () {
      // Request Pushnotis
      request(app).get('/api/pushnotis')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Pushnoti if not signed in', function (done) {
    // Create new Pushnoti model instance
    var pushnotiObj = new Pushnoti(pushnoti);

    // Save the Pushnoti
    pushnotiObj.save(function () {
      request(app).get('/api/pushnotis/' + pushnotiObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('user_id', pushnoti.user_id);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Pushnoti with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/pushnotis/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Pushnoti is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Pushnoti which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Pushnoti
    request(app).get('/api/pushnotis/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Pushnoti with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Pushnoti if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Pushnoti
        agent.post('/api/pushnotis')
          .send(pushnoti)
          .expect(200)
          .end(function (pushnotiSaveErr, pushnotiSaveRes) {
            // Handle Pushnoti save error
            if (pushnotiSaveErr) {
              return done(pushnotiSaveErr);
            }

            // Delete an existing Pushnoti
            agent.delete('/api/pushnotis/' + pushnotiSaveRes.body._id)
              .send(pushnoti)
              .expect(200)
              .end(function (pushnotiDeleteErr, pushnotiDeleteRes) {
                // Handle pushnoti error error
                if (pushnotiDeleteErr) {
                  return done(pushnotiDeleteErr);
                }

                // Set assertions
                (pushnotiDeleteRes.body._id).should.equal(pushnotiSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single Pushnoti that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Pushnoti
          agent.post('/api/pushnotis')
            .send(pushnoti)
            .expect(200)
            .end(function (pushnotiSaveErr, pushnotiSaveRes) {
              // Handle Pushnoti save error
              if (pushnotiSaveErr) {
                return done(pushnotiSaveErr);
              }

              // Set assertions on new Pushnoti
              (pushnotiSaveRes.body.user_id).should.equal(pushnoti.user_id);
              should.exist(pushnotiSaveRes.body.user);
              should.equal(pushnotiSaveRes.body.user._id, orphanId);

              // force the Pushnoti to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Pushnoti
                    agent.get('/api/pushnotis/' + pushnotiSaveRes.body._id)
                      .expect(200)
                      .end(function (pushnotiInfoErr, pushnotiInfoRes) {
                        // Handle Pushnoti error
                        if (pushnotiInfoErr) {
                          return done(pushnotiInfoErr);
                        }

                        // Set assertions
                        (pushnotiInfoRes.body._id).should.equal(pushnotiSaveRes.body._id);
                        (pushnotiInfoRes.body.user_id).should.equal(pushnoti.user_id);
                        should.equal(pushnotiInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Pushnoti.remove().exec(done);
    });
  });
});

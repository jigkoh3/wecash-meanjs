'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Exchange = mongoose.model('Exchange'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  exchange;

/**
 * Exchange routes tests
 */
describe('Exchange CRUD tests', function () {

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
      countryCode:'+66',
      contact:9876567432,
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Exchange
    user.save(function () {
      exchange = {
        currency_from: 'USD',
        amount_from: 1250,
        currency_to: 'THB',
        amount_to: 41000,
        location: 'bangkok',
        schedule: Date.now()
      };

      done();
    });
  });

  it('should be able to save a Exchange if logged in', function (done) {
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

        // Save a new Exchange
        agent.post('/api/exchanges')
          .send(exchange)
          .expect(200)
          .end(function (exchangeSaveErr, exchangeSaveRes) {
            // Handle Exchange save error
            if (exchangeSaveErr) {
              return done(exchangeSaveErr);
            }

            // Get a list of Exchanges
            agent.get('/api/exchanges')
              .end(function (exchangesGetErr, exchangesGetRes) {
                // Handle Exchanges save error
                if (exchangesGetErr) {
                  return done(exchangesGetErr);
                }

                // Get Exchanges list
                var exchanges = exchangesGetRes.body;

                // Set assertions
                // (exchanges[0].user._id).should.equal(userId);
                // (exchanges[0].currency_from).should.match('Exchange currency_from');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Exchange if not logged in', function (done) {
    agent.post('/api/exchanges')
      .send(exchange)
      .expect(403)
      .end(function (exchangeSaveErr, exchangeSaveRes) {
        // Call the assertion callback
        done(exchangeSaveErr);
      });
  });
// currency_from
  it('should not be able to save an Exchange if no currency_from is provided', function (done) {
    // Invalidate currency_from field
    exchange.currency_from = '';

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

        // Save a new Exchange
        agent.post('/api/exchanges')
          .send(exchange)
          .expect(400)
          .end(function (exchangeSaveErr, exchangeSaveRes) {
            // Set message assertion
            (exchangeSaveRes.body.message).should.match('Please fill Exchange currency_from');

            // Handle Exchange save error
            done(exchangeSaveErr);
          });
      });
  });
  // amount_from
  it('should not be able to save an Exchange if no amount_from is provided', function (done) {
    // Invalidate amount_from field
    exchange.amount_from = null;

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

        // Save a new Exchange
        agent.post('/api/exchanges')
          .send(exchange)
          .expect(400)
          .end(function (exchangeSaveErr, exchangeSaveRes) {
            // Set message assertion
            (exchangeSaveRes.body.message).should.match('Please fill Exchange amount_from');

            // Handle Exchange save error
            done(exchangeSaveErr);
          });
      });
  });
  // currency_to
  it('should not be able to save an Exchange if no currency_to is provided', function (done) {
    // Invalidate currency_to field
    exchange.currency_to = '';

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

        // Save a new Exchange
        agent.post('/api/exchanges')
          .send(exchange)
          .expect(400)
          .end(function (exchangeSaveErr, exchangeSaveRes) {
            // Set message assertion
            (exchangeSaveRes.body.message).should.match('Please fill Exchange currency_to');

            // Handle Exchange save error
            done(exchangeSaveErr);
          });
      });
  });
  // amount_to
  it('should not be able to save an Exchange if no amount_to is provided', function (done) {
    // Invalidate amount_to field
    exchange.amount_to = null;

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

        // Save a new Exchange
        agent.post('/api/exchanges')
          .send(exchange)
          .expect(400)
          .end(function (exchangeSaveErr, exchangeSaveRes) {
            // Set message assertion
            (exchangeSaveRes.body.message).should.match('Please fill Exchange amount_to');

            // Handle Exchange save error
            done(exchangeSaveErr);
          });
      });
  });
  // location
  it('should not be able to save an Exchange if no location is provided', function (done) {
    // Invalidate location field
    exchange.location = '';

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

        // Save a new Exchange
        agent.post('/api/exchanges')
          .send(exchange)
          .expect(400)
          .end(function (exchangeSaveErr, exchangeSaveRes) {
            // Set message assertion
            (exchangeSaveRes.body.message).should.match('Please fill Exchange location');

            // Handle Exchange save error
            done(exchangeSaveErr);
          });
      });
  });
   // schedule
  it('should not be able to save an Exchange if no schedule is provided', function (done) {
    // Invalidate schedule field
    exchange.schedule = null;

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

        // Save a new Exchange
        agent.post('/api/exchanges')
          .send(exchange)
          .expect(400)
          .end(function (exchangeSaveErr, exchangeSaveRes) {
            // Set message assertion
            (exchangeSaveRes.body.message).should.match('Please fill Exchange schedule');

            // Handle Exchange save error
            done(exchangeSaveErr);
          });
      });
  });

  it('should be able to update an Exchange if signed in', function (done) {
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

        // Save a new Exchange
        agent.post('/api/exchanges')
          .send(exchange)
          .expect(200)
          .end(function (exchangeSaveErr, exchangeSaveRes) {
            // Handle Exchange save error
            if (exchangeSaveErr) {
              return done(exchangeSaveErr);
            }

            // Update Exchange currency_from
            exchange.currency_from = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Exchange
            agent.put('/api/exchanges/' + exchangeSaveRes.body._id)
              .send(exchange)
              .expect(200)
              .end(function (exchangeUpdateErr, exchangeUpdateRes) {
                // Handle Exchange update error
                if (exchangeUpdateErr) {
                  return done(exchangeUpdateErr);
                }

                // Set assertions
                (exchangeUpdateRes.body._id).should.equal(exchangeSaveRes.body._id);
                (exchangeUpdateRes.body.currency_from).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Exchanges if not signed in', function (done) {
    // Create new Exchange model instance
    var exchangeObj = new Exchange(exchange);

    // Save the exchange
    exchangeObj.save(function () {
      // Request Exchanges
      request(app).get('/api/exchanges')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Exchange if not signed in', function (done) {
    // Create new Exchange model instance
    var exchangeObj = new Exchange(exchange);

    // Save the Exchange
    exchangeObj.save(function () {
      request(app).get('/api/exchanges/' + exchangeObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('currency_from', exchange.currency_from);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Exchange with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/exchanges/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Exchange is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Exchange which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Exchange
    request(app).get('/api/exchanges/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Exchange with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Exchange if signed in', function (done) {
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

        // Save a new Exchange
        agent.post('/api/exchanges')
          .send(exchange)
          .expect(200)
          .end(function (exchangeSaveErr, exchangeSaveRes) {
            // Handle Exchange save error
            if (exchangeSaveErr) {
              return done(exchangeSaveErr);
            }

            // Delete an existing Exchange
            agent.delete('/api/exchanges/' + exchangeSaveRes.body._id)
              .send(exchange)
              .expect(200)
              .end(function (exchangeDeleteErr, exchangeDeleteRes) {
                // Handle exchange error error
                if (exchangeDeleteErr) {
                  return done(exchangeDeleteErr);
                }

                // Set assertions
                (exchangeDeleteRes.body._id).should.equal(exchangeSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Exchange if not signed in', function (done) {
    // Set Exchange user
    exchange.user = user;

    // Create new Exchange model instance
    var exchangeObj = new Exchange(exchange);

    // Save the Exchange
    exchangeObj.save(function () {
      // Try deleting Exchange
      request(app).delete('/api/exchanges/' + exchangeObj._id)
        .expect(403)
        .end(function (exchangeDeleteErr, exchangeDeleteRes) {
          // Set message assertion
          (exchangeDeleteRes.body.message).should.match('User is not authorized');

          // Handle Exchange error error
          done(exchangeDeleteErr);
        });

    });
  });

  it('should be able to get a single Exchange that has an orphaned user reference', function (done) {
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
      countryCode:'+66',
      contact:9876567432,
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

          // Save a new Exchange
          agent.post('/api/exchanges')
            .send(exchange)
            .expect(200)
            .end(function (exchangeSaveErr, exchangeSaveRes) {
              // Handle Exchange save error
              if (exchangeSaveErr) {
                return done(exchangeSaveErr);
              }

              // Set assertions on new Exchange
              (exchangeSaveRes.body.currency_from).should.equal(exchange.currency_from);
              should.exist(exchangeSaveRes.body.user);
              should.equal(exchangeSaveRes.body.user._id, orphanId);

              // force the Exchange to have an orphaned user reference
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

                    // Get the Exchange
                    agent.get('/api/exchanges/' + exchangeSaveRes.body._id)
                      .expect(200)
                      .end(function (exchangeInfoErr, exchangeInfoRes) {
                        // Handle Exchange error
                        if (exchangeInfoErr) {
                          return done(exchangeInfoErr);
                        }

                        // Set assertions
                        (exchangeInfoRes.body._id).should.equal(exchangeSaveRes.body._id);
                        (exchangeInfoRes.body.currency_from).should.equal(exchange.currency_from);
                        should.equal(exchangeInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  it('should be able to Get Exchange Base', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }
        var exchangebase = 'THB';

        // Get the Base
        var userId = user.id;
        // Save a new Base
        agent.get('/api/exchangesrate/' + exchangebase)
          .end(function (exchangesGetErr, exchangesGetRes) {
            // Handle Exchanges save error
            if (exchangesGetErr) {
              return done(exchangesGetErr);
            }

            // Get Exchanges list
            var exchanges = exchangesGetRes.body;

            // Set assertions
            (exchanges.base).should.equal(exchangebase);
            //rates
            (exchanges.rates.length).should.equal(31);
            
            // Call the assertion callback
            done();
          });
      });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Exchange.remove().exec(done);
    });
  });
});

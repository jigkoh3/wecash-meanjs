'use strict';

/**
 * Module dependencies.
 */

var path = require('path'),
  mongoose = require('mongoose'),
  Exchange = mongoose.model('Exchange'),
  request = require('request'),
  exchangeUrl = 'http://api.fixer.io/latest?base=',
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  Pushnoti = mongoose.model('Pushnoti'),
  request = require('request'),
  pushNotiUrl = process.env.PUSH_NOTI_URL || 'https://api.ionic.io/push/notifications',
  pushNotiAuthenUSR = {
    profile: process.env.PUSH_NOTI_PROFILE || 'dev',
    auth: process.env.PUSH_NOTI_USR_AUTH || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjNDViMDQwYS02MDQ4LTQ5ZGItOTE4Yy0wOWZiYzczOWNjZDYifQ.3dWThh_h51DCFoRA3Y9RAR53BneZwkPLtH1ri3FHKzI'
  };

/**
 * Create a Exchange
 */
exports.create = function (req, res) {
  var exchange = new Exchange(req.body);
  exchange.user = req.user;

  exchange.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      sendUsers();
      res.jsonp(exchange);
    }
  });
};

/**
 * Show the current Exchange
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var exchange = req.exchange ? req.exchange.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  exchange.isCurrentUserOwner = req.user && exchange.user && exchange.user._id.toString() === req.user._id.toString();

  res.jsonp(exchange);
};

exports.exchangesrate = function (req, res) {
  var exchangesrate = req.exchangesrate;
  if (exchangesrate && exchangesrate.rates) {
    var rates = JSON.stringify(exchangesrate.rates).replace('{', '').replace('}', '').split(',');
    exchangesrate.rates = [];
    rates.forEach(function (rate) {
      exchangesrate.rates.push({
        currency: rate.split(':')[0].replace('"', '').replace('"', ''),
        value: 1 / parseFloat(rate.split(':')[1])
      });
    });
  }

  res.jsonp(exchangesrate);
};

/**
 * Update a Exchange
 */
exports.update = function (req, res) {
  var exchange = req.exchange;

  exchange = _.extend(exchange, req.body);

  exchange.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(exchange);
    }
  });
};

/**
 * Delete an Exchange
 */
exports.delete = function (req, res) {
  var exchange = req.exchange;

  exchange.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(exchange);
    }
  });
};

/**
 * List of Exchanges
 */
exports.list = function (req, res) {
  Exchange.find({ schedule: { $lte: new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate()) } }).sort('-created').populate('user').exec(function (err, exchanges) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(exchanges);
    }
  });
};

/**
 * Exchange middleware
 */
exports.exchangeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Exchange is invalid'
    });
  }

  Exchange.findById(id).populate('user').exec(function (err, exchange) {
    if (err) {
      return next(err);
    } else if (!exchange) {
      return res.status(404).send({
        message: 'No Exchange with that identifier has been found'
      });
    }
    req.exchange = exchange;
    next();
  });
};

exports.exchangeByBase = function (req, res, next, base) {

  request({
    url: exchangeUrl + base,
    method: 'GET',
  }, function (error, response, body) {
    if (error) {
      return next(error);
    } else if (response.body.error) {
      return res.status(404).send({
        message: response.body.error
      });
    } else {
      //res.jsonp(JSON.parse(response.body));
      req.exchangesrate = JSON.parse(response.body);
      next();
    }
  });
};

function sendUsers() {
  Pushnoti.find().sort('-created').where('role').equals('user').exec(function (err, users) {
    if (err) {

    } else {
      var usrtokens = [];
      users.forEach(function (user) {
        usrtokens.push(user.device_token);
      });

      request({
        url: pushNotiUrl,
        auth: {
          'bearer': pushNotiAuthenUSR.auth
        },
        method: 'POST',
        json: {
          tokens: usrtokens,
          profile: pushNotiAuthenUSR.profile,
          notification: {
            message: 'มีรายการสร้างใหม่',
            //ios: { badge: orders.length, sound: 'default' },
            //android: { data: { badge: orders.length } }//{ badge: orders.length, sound: 'default' }
          }
        }
      }, function (error, response, body) {
        if (error) {
          console.log('Error sending messages: ', error);
        } else if (response.body.error) {
          console.log('Error: ', response.body.error);
        }
      });
    }
  });


}

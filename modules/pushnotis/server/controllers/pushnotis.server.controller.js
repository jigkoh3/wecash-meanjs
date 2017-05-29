'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Pushnoti = mongoose.model('Pushnoti'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Pushnoti
 */
exports.create = function(req, res) {
  var pushnoti = new Pushnoti(req.body);
  pushnoti.user = req.user;

  pushnoti.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(pushnoti);
    }
  });
};

/**
 * Show the current Pushnoti
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var pushnoti = req.pushnoti ? req.pushnoti.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  pushnoti.isCurrentUserOwner = req.user && pushnoti.user && pushnoti.user._id.toString() === req.user._id.toString();

  res.jsonp(pushnoti);
};

/**
 * Update a Pushnoti
 */
exports.update = function(req, res) {
  var pushnoti = req.pushnoti;

  pushnoti = _.extend(pushnoti, req.body);

  pushnoti.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(pushnoti);
    }
  });
};

/**
 * Delete an Pushnoti
 */
exports.delete = function(req, res) {
  var pushnoti = req.pushnoti;

  pushnoti.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(pushnoti);
    }
  });
};

/**
 * List of Pushnotis
 */
exports.list = function(req, res) {
  Pushnoti.find().sort('-created').populate('user', 'displayName').exec(function(err, pushnotis) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(pushnotis);
    }
  });
};

/**
 * Pushnoti middleware
 */
exports.pushnotiByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Pushnoti is invalid'
    });
  }

  Pushnoti.findById(id).populate('user', 'displayName').exec(function (err, pushnoti) {
    if (err) {
      return next(err);
    } else if (!pushnoti) {
      return res.status(404).send({
        message: 'No Pushnoti with that identifier has been found'
      });
    }
    req.pushnoti = pushnoti;
    next();
  });
};

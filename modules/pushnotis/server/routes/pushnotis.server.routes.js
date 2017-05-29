'use strict';

/**
 * Module dependencies
 */
var pushnotisPolicy = require('../policies/pushnotis.server.policy'),
  pushnotis = require('../controllers/pushnotis.server.controller');

module.exports = function(app) {
  // Pushnotis Routes
  app.route('/api/pushnotis').all(pushnotisPolicy.isAllowed)
    .get(pushnotis.list)
    .post(pushnotis.create);

  app.route('/api/pushnotis/:pushnotiId').all(pushnotisPolicy.isAllowed)
    .get(pushnotis.read)
    .put(pushnotis.update)
    .delete(pushnotis.delete);

  // Finish by binding the Pushnoti middleware
  app.param('pushnotiId', pushnotis.pushnotiByID);
};

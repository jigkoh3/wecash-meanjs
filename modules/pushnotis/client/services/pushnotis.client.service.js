// Pushnotis service used to communicate Pushnotis REST endpoints
(function () {
  'use strict';

  angular
    .module('pushnotis')
    .factory('PushnotisService', PushnotisService);

  PushnotisService.$inject = ['$resource'];

  function PushnotisService($resource) {
    return $resource('api/pushnotis/:pushnotiId', {
      pushnotiId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

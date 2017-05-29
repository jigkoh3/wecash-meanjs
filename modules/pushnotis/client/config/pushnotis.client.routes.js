(function () {
  'use strict';

  angular
    .module('pushnotis')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('pushnotis', {
        abstract: true,
        url: '/pushnotis',
        template: '<ui-view/>'
      })
      .state('pushnotis.list', {
        url: '',
        templateUrl: 'modules/pushnotis/client/views/list-pushnotis.client.view.html',
        controller: 'PushnotisListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Pushnotis List'
        }
      })
      .state('pushnotis.create', {
        url: '/create',
        templateUrl: 'modules/pushnotis/client/views/form-pushnoti.client.view.html',
        controller: 'PushnotisController',
        controllerAs: 'vm',
        resolve: {
          pushnotiResolve: newPushnoti
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Pushnotis Create'
        }
      })
      .state('pushnotis.edit', {
        url: '/:pushnotiId/edit',
        templateUrl: 'modules/pushnotis/client/views/form-pushnoti.client.view.html',
        controller: 'PushnotisController',
        controllerAs: 'vm',
        resolve: {
          pushnotiResolve: getPushnoti
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Pushnoti {{ pushnotiResolve.name }}'
        }
      })
      .state('pushnotis.view', {
        url: '/:pushnotiId',
        templateUrl: 'modules/pushnotis/client/views/view-pushnoti.client.view.html',
        controller: 'PushnotisController',
        controllerAs: 'vm',
        resolve: {
          pushnotiResolve: getPushnoti
        },
        data: {
          pageTitle: 'Pushnoti {{ pushnotiResolve.name }}'
        }
      });
  }

  getPushnoti.$inject = ['$stateParams', 'PushnotisService'];

  function getPushnoti($stateParams, PushnotisService) {
    return PushnotisService.get({
      pushnotiId: $stateParams.pushnotiId
    }).$promise;
  }

  newPushnoti.$inject = ['PushnotisService'];

  function newPushnoti(PushnotisService) {
    return new PushnotisService();
  }
}());

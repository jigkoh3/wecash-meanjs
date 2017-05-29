(function () {
  'use strict';

  // Pushnotis controller
  angular
    .module('pushnotis')
    .controller('PushnotisController', PushnotisController);

  PushnotisController.$inject = ['$scope', '$state', '$window', 'Authentication', 'pushnotiResolve'];

  function PushnotisController ($scope, $state, $window, Authentication, pushnoti) {
    var vm = this;

    vm.authentication = Authentication;
    vm.pushnoti = pushnoti;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Pushnoti
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.pushnoti.$remove($state.go('pushnotis.list'));
      }
    }

    // Save Pushnoti
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.pushnotiForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.pushnoti._id) {
        vm.pushnoti.$update(successCallback, errorCallback);
      } else {
        vm.pushnoti.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('pushnotis.view', {
          pushnotiId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

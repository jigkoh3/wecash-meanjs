(function () {
  'use strict';

  angular
    .module('pushnotis')
    .controller('PushnotisListController', PushnotisListController);

  PushnotisListController.$inject = ['PushnotisService'];

  function PushnotisListController(PushnotisService) {
    var vm = this;

    vm.pushnotis = PushnotisService.query();
  }
}());

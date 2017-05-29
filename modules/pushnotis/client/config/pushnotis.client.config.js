(function () {
  'use strict';

  angular
    .module('pushnotis')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Pushnotis',
      state: 'pushnotis',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'pushnotis', {
      title: 'List Pushnotis',
      state: 'pushnotis.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'pushnotis', {
      title: 'Create Pushnoti',
      state: 'pushnotis.create',
      roles: ['user']
    });
  }
}());

(function () {
  'use strict';

  angular
    .module('books')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Livres',
      state: 'books',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'books', {
      title: 'Les livres',
      state: 'books.list',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'books', {
      title: 'Ajouter un livre',
      state: 'books.create',
      roles: ['user']
    });
  }
}());

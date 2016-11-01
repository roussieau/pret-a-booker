(function () {
  'use strict';

  angular
    .module('books.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.books', {
        abstract: true,
        url: '/books',
        template: '<ui-view/>'
      })
      .state('admin.books.list', {
        url: '',
        templateUrl: '/modules/books/client/views/admin/list-books.client.view.html',
        controller: 'ArticlesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.books.create', {
        url: '/create',
        templateUrl: '/modules/books/client/views/admin/form-book.client.view.html',
        controller: 'ArticlesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bookResolve: newArticle
        }
      })
      .state('admin.books.edit', {
        url: '/:bookId/edit',
        templateUrl: '/modules/books/client/views/admin/form-book.client.view.html',
        controller: 'ArticlesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          bookResolve: getArticle
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'ArticlesService'];

  function getArticle($stateParams, ArticlesService) {
    return ArticlesService.get({
      bookId: $stateParams.bookId
    }).$promise;
  }

  newArticle.$inject = ['ArticlesService'];

  function newArticle(ArticlesService) {
    return new ArticlesService();
  }
}());

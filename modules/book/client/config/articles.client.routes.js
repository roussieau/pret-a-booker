(function () {
  'use strict';

  angular
    .module('books.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('books', {
        abstract: true,
        url: '/books',
        template: '<ui-view/>'
      })
      .state('books.list', {
        url: '',
        templateUrl: '/modules/books/client/views/list-books.client.view.html',
        controller: 'ArticlesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Articles List'
        }
      })
      .state('books.view', {
        url: '/:bookId',
        templateUrl: '/modules/books/client/views/view-book.client.view.html',
        controller: 'ArticlesController',
        controllerAs: 'vm',
        resolve: {
          bookResolve: getArticle
        },
        data: {
          pageTitle: 'Article {{ bookResolve.title }}'
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'ArticlesService'];

  function getArticle($stateParams, ArticlesService) {
    return ArticlesService.get({
      bookId: $stateParams.bookId
    }).$promise;
  }
}());

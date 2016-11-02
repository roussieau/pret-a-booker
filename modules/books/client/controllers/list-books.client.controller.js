(function () {
  'use strict';

  angular
    .module('books')
    .controller('BooksListController', BooksListController);

  BooksListController.$inject = ['BooksService', '$scope'];

  function BooksListController(BooksService, $scope) {
    var vm = this;

    vm.books = BooksService.query();
    $scope.orderByMe = function(x) {
        $scope.myOrderBy = x;
    }
  }
}());

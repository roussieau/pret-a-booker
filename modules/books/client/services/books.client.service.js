(function () {
  'use strict';

  angular
    .module('books.services')
    .factory('BooksService', BooksService);

  BooksService.$inject = ['$resource', '$log'];

  function BooksService($resource, $log) {
    var Book = $resource('/api/books/:bookId', {
      bookId: '@book'
    });

    angular.extend(Book.prototype, {
      create: function () {
        var book = this;
        return create(book);
      }
    });

    return Book;

    function create(book) {
        book.book = '581a221f100e931eb5cc3fe1';
      return book.$save(onSuccess, onError);

      // Handle successful response
      function onSuccess(book) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());

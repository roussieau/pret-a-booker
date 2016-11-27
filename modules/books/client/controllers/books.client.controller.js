(function () {
  'use strict';

  angular
    .module('books')
    .controller('booksController', booksController);

  booksController.$inject = ['$scope', 'bookResolve', 'Authentication', '$state', 'Notification'];

  function booksController($scope, book, Authentication, $state, Notification) {
    var vm = this;

    vm.book = book;
    vm.book.book = book._id;
    vm.book._id = null;
    vm.authentication = Authentication;
    vm.form = {};
    vm.save = save;

    // Save Book
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.bookForm');
        return false;
      }

      // Create a new book, or update the current instance
      vm.book.create()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('books.list'); // should we send the User to the list or the updated Book's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Book saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Book save error!' });
      }
    }
  }
}());

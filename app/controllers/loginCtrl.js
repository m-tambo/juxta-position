app
  .controller('loginCtrl', function($scope, authFactory) {

    $scope.goToRegister = function () {
      document.querySelector('.login').setAttribute('hidden', 'hidden')
      document.querySelector('.register').removeAttribute('hidden')
    };

    $scope.loginUser = function () {
      console.log('clicked')
    };

    $scope.registerUser = function () {
      console.log('clicked')
    }
})

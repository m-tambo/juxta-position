app
  .controller('loginCtrl', function($scope, authFactory, $location) {

    $scope.goToRegister = function () {
      document.querySelector('.login').setAttribute('hidden', 'hidden')
      document.querySelector('.register').removeAttribute('hidden')
    };

    $scope.loginUser = function () {
      authFactory.login($scope.loginEmail, $scope.loginPass)
        .then(() => {
          $location.path('/')
        })
    };

    $scope.registerUser = function () {
      authFactory.register($scope.registerEmail, $scope.registerPass)
        .then(() => {
          $location.path('/')
        })
    }
})

app
  .controller('loginCtrl', function($scope, authFactory, $location) {
    console.log('login controller firing')

      // show login page, remove register page, if showing
    document.querySelector('.login').removeAttribute('hidden')
    document.querySelector('.register').setAttribute('hidden', 'hidden')

    $scope.goToRegister = function () {
      document.querySelector('.login').setAttribute('hidden', 'hidden')
      document.querySelector('.register').removeAttribute('hidden')
    };

    $scope.loginUser = function () {
      authFactory.login($scope.loginEmail, $scope.loginPass)
        .then(() => {
          $location.path('/profile')
        })
    };

    $scope.registerUser = function () {
      authFactory.register($scope.registerEmail, $scope.registerPass)
        .then(() => {
          $location.path('/profile')
        })
    }
})

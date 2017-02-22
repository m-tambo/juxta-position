app
  .controller('loginCtrl', function($scope, authFactory, $location) {
    console.log('login controller firing')

      // show login page, remove register page, if showing
    $scope.login = true
    $scope.register = false

    $scope.goToRegister = function () {
      $scope.login = false
      $scope.register = true
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

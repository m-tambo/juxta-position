const dir = angular.module('directives', []);

dir
  .directive('navbar', function() {
    return {
      restrict: "E",  // defines this directive as the element <navbar>
      templateUrl: "/app/partials/navbar.html",
      controller: function($scope, authFactory, $location) {
        // console.log('navbar controller firing')

        // authFactory.getUser()
        //   .then(user => {
        //     console.log('USER', user)
        //     $scope.user = user
        //   })
        //   .catch((err) => {
        //     $scope.user = null
        //     console.error(err)
        //   })

        $scope.hideNav = function () {  // clear the nav bar when a link is selected
          $('.button-collapse').sideNav('hide');
        }

        $scope.goToLogin = function () {
          $scope.hideNav()
          console.log('go to login')
          $location.url('/login')
          $scope.login = true
          $scope.register = false
        };

        $scope.goToRegister = function () {
          $scope.register = true
          $scope.login = false
          $scope.hideNav()
          console.log('go to register')
        };

        $scope.signOut = function () {
          authFactory.logout()
          $location.path('/')
          $scope.hideNav()
        }

        $(".button-collapse").sideNav();

      },

      resolve: {
          user (authFactory, $location) {
            return authFactory
              .getUser()
              .catch(() => $location.url('/login'))
          }
      }
    }

  });

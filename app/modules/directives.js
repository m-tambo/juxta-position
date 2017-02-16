const dir = angular.module('directives', []);

dir
  .directive('navbar', function() {
    return {
      restrict: "E",  // defines this directive as the element <navbar>
      templateUrl: "/app/partials/navbar.html",
      controller: function($scope, authFactory, $location) {
        console.log('navbar controller firing')

        $scope.user = firebase.auth().currentUser
        console.log($scope.user)

        $scope.hideNav = function () {  // clear the nav bar when a link is selected
          $('.button-collapse').sideNav('hide');
        }

        $scope.goToLogin = function () {
          console.log('go to login')
          document.querySelector('.login').removeAttribute('hidden');
          document.querySelector('.register').setAttribute('hidden', 'hidden');
          $scope.hideNav()
        };

        $scope.goToRegister = function () {
          console.log('go to register')
          document.querySelector('.login').setAttribute('hidden', 'hidden');
          document.querySelector('.register').removeAttribute('hidden');
          $scope.hideNav()
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

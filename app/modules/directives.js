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

        $(".button-collapse").sideNav();

        $scope.goToRegister = function () {
          document.querySelector('.login').setAttribute('hidden', 'hidden')
          document.querySelector('.register').removeAttribute('hidden')
        };

        $scope.signOut = function () {
          authFactory.logout()
          $location.path('/')
        }
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

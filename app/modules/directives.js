const dir = angular.module('directives', []);

dir
  .directive('navbar', function() {
    return {
      restrict: "E",  // defines this directive as the element <navbar>
      templateUrl: "/app/partials/navbar.html",
      controller: function($scope, authFactory, $location) {
        $scope.user = firebase.auth().currentUser
        console.log($scope.user)

        $(".button-collapse").sideNav();

        $scope.signOut = function () {
          authFactory.logout()
          $location.path('/')
        }
      }
    };

  });

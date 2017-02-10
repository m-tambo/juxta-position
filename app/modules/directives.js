const dir = angular.module('directives', []);

dir
  .directive('navbar', function($scope, authFactory, $location) {
    return {
      restrict: "E",
      templateUrl: "/app/partials/navbar.html",
      controller: function() {

        $(".button-collapse").sideNav();
        $scope.signOut = function () {
          authFactory.logout()
          $location.path('/')
        }
      }
    };

  });

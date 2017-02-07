const dir = angular.module('directives', []);

dir
  .directive('navbar', function() {
    return {
      restrict: "E",
      templateUrl: "/app/partials/navbar.html"
    };
  });

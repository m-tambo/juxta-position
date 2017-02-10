const app = angular.module('juxtaPosition', ['ngRoute', 'directives'])

app
  .config(($routeProvider) => {

    firebase.initializeApp({
      apiKey: "AIzaSyC3aWQn02Qm3-XRKmPKfCk4pgVVZ51zyLM",
      authDomain: "juxta-position.firebaseapp.com",
      databaseURL: "https://juxta-position.firebaseio.com",
      storageBucket: "juxta-position.appspot.com",
      messagingSenderId: "967364970214"
    });

    $routeProvider
      .when('/main', {
        controller: "mainCtrl",
        templateUrl: "/app/partials/main.html",
        resolve: {
          players: function (apiFactory) {
            return apiFactory.getPlayers()
          }
        }
      })
      .when('/user', {
        controller: "userCtrl",
        templateUrl: "/app/partials/user.html",
        resolve: {
          user (authFactory, $location) {
            return authFactory
              .getUser()
              .catch(() => $location.url('/login'))
          },
        }

      })
      .when('/login', {
        controller: "loginCtrl",
        templateUrl: "/app/partials/login.html"
        // resolve:

      })
      .otherwise({
        redirectTo: "/main"
      })

  });

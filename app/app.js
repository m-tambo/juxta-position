const app = angular.module('juxtaPosition', ['ngRoute', 'directives', 'chart.js'])

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
        templateUrl: "app/partials/main.html",
        resolve: {
          players: function (apiFactory) {
            return apiFactory.getPlayers()
          }
        }
      })
      .when('/juxta/:paramX/:paramY/:week', {
        controller: "juxtaCtrl",
        templateUrl: "app/partials/juxta.html",
        resolve: {
          players: function (apiFactory) {
            return apiFactory.getPlayers()
          },
          playernews: function (apiFactory) {
            return apiFactory.getPlayerNews()
          }
        }
      })
      .when('/profile', {
        controller: "profileCtrl",
        templateUrl: "app/partials/profile.html",
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
        templateUrl: "app/partials/login.html"
        // resolve:

      })
      .otherwise({
        redirectTo: "/main"
      })

  })

  .run($rootScope => firebase.auth().onAuthStateChanged(user => $rootScope.user = user))  // $sscott magic

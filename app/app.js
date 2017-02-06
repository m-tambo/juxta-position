const app = angular
  .module('juxtaPosition', ['ngRoute'])
  .config(($routeProvider) => {

    firebase.initializeApp({
      apiKey: "AIzaSyC3aWQn02Qm3-XRKmPKfCk4pgVVZ51zyLM",
      authDomain: "juxta-position.firebaseapp.com",
      databaseURL: "https://juxta-position.firebaseio.com",
      storageBucket: "juxta-position.appspot.com",
      messagingSenderId: "967364970214"
    });

    $routeProvider
      .when('/', {
        controller: "mainCtrl",
        templateUrl: "/app/partials/main.html",
        // resolve:

      })

  })

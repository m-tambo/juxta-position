app
  .controller('profileCtrl', function($scope) {
    console.log('profile controller firing')

    $scope.user = firebase.auth().currentUser

  })

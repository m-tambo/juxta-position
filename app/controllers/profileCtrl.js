app
  .controller('profileCtrl', function($scope) {
    console.log('profile controller firing')

    $scope.user = firebase.auth().currentUser
    $scope.profilePic = 'http://nexus1492.eu/wp-content/plugins/smartcat_our_team/inc/img/noprofile.jpg'
  })
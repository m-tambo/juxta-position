app
  .controller('profileCtrl', function($scope) { // firebaseFactory
    console.log('profile controller firing')

    $scope.user = firebase.auth().currentUser
    $scope.profilePic = 'http://nexus1492.eu/wp-content/plugins/smartcat_our_team/inc/img/noprofile.jpg'

    $scope.comps = [1, 2, 3, 4, 5]
    // $scope.firebaseFactory.getComps;
  })

app
  .controller('profileCtrl', function($scope, firebaseFactory, user) {
    console.log('profile controller firing')

    $scope.user = firebase.auth().currentUser
    $scope.profilePic = 'http://nexus1492.eu/wp-content/plugins/smartcat_our_team/inc/img/noprofile.jpg'

    firebaseFactory.getComps()
      .then((comps) => {
        console.log(comps)
        $scope.comps = comps
      })

    $scope.deleteComp = function (id) {
      console.log('delete')
      firebaseFactory.deleteComp(id)
        .then(() => {
          delete $scope.comps[id]  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
        })
    }

    $scope.addNote = function (id, note) {
      firebaseFactory.patchNote(id, note)
        .then(() => {
          $scope.comps[id].note = note
        })
    }

    // _____ materialize stuff _____
    $scope.openComp = function () {
      $('.collapsible').collapsible();
    }

    $('.tooltipped').tooltip({delay: 50})

  })

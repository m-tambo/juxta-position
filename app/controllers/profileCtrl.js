app
  .controller('profileCtrl', function($scope, firebaseFactory, user, $location) {
    console.log('profile controller firing')

    $scope.user = firebase.auth().currentUser
    $scope.profilePic = 'http://nexus1492.eu/wp-content/plugins/smartcat_our_team/inc/img/noprofile.jpg'
    $scope.profilePic = firebase.auth().currentUser.photoURL

    firebaseFactory.getComps()  // get comparisons from firebase
      .then((comps) => {
        $scope.comps = comps
      })

    $scope.deleteComp = function (id) {
      console.log('delete')
      firebaseFactory.deleteComp(id)
        .then(() => {               // dynamically delete note from dom
          delete $scope.comps[id]  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
        })
    }

    $scope.addNote = function (id, note) {
      firebaseFactory.patchNote(id, note)
        .then(() => {                   // dynamically adds the note to the dom
          $scope.comps[id].note = note
        })
    }

    $scope.reviewComp = function (x, y, w) {
      $location.url(`/juxta/${x}/${y}/${w}`)  // injects the two names and the week as route params

    }

    $scope.changePic = function () {

      console.log('works')
    }

    // _____ materialize stuff _____
    $scope.openComp = function () {
      $('.collapsible').collapsible();
    }

    $('.tooltipped').tooltip({delay: 50})


  })

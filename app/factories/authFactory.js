app
  .factory('authFactory', function($q) {
    return {

      login (email, pass) {
        // converts native ES6 promise to angular promise so no $scope.$apply needed
        return $q.resolve(firebase.auth().signInWithEmailAndPassword(email, pass))
      },

      register (email, pass) {
        return $q.resolve(firebase.auth().registerNewUser)
      },

      getUser () {
        return $q((resolve, reject) => {
          // http://stackoverflow.com/questions/37370224/firebase-stop-listening-onauthstatechanged
          const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe()
            if (user) {
              resolve(user)
            } else {
              reject()
            }
          })
        })
      },

      logout () {
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
        }, function(error) {
          // An error happened.
        });
      }

    }
  })

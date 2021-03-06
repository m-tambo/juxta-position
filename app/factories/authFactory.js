app
  .factory('authFactory', function($q, $http) {
    let currentUser = undefined

    return {

      login (email, pass) {
        // converts promise to angular promise so no $scope.$apply needed
        return $q.resolve(firebase.auth().signInWithEmailAndPassword(email, pass))
          .then((res) => {
            return res.uid
          })
      },

      register (email, pass) {
        return $q
          .resolve(firebase.auth().createUserWithEmailAndPassword(email, pass))
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
          })
          .then(() => {
            console.log(email)
            return firebase.auth().currentUser.uid
          })
          .then((uid, email) => {
            console.log(uid)
            let newUser = {
              uid: uid,
              email: email
            }
            return $http
              .post('https://juxta-position.firebaseio.com/user.json', newUser)
              .then(() => {
                return newUser
              })
          })
      },

      logout () {
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
        }, function(error) {
          // An error happened.
        });
      },

      getUser () {
        return $q((resolve, reject) => {
          // http://stackoverflow.com/questions/37370224/firebase-stop-listening-onauthstatechanged
          const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe()
            if (user) {
              resolve(user)
            } else {
              reject('Not logged in')
            }
          })
        })
      }

    }
  })

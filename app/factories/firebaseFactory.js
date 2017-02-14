app
  .factory('firebaseFactory', function($http) {
    return {
      postComp : (playerX, playerY, choice) => {
        let newComp = {
          playerX: playerX,
          playerY: playerY,
          choice: choice
        };

        return $http
          .post('https://juxta-position.firebaseio.com/comps.json', newComp)
          .then(() => {
            return newComp
          })
      },

      getComp : (uid) => {
        return $http
          .get('https://juxta-position.firebaseio.com/comps.json')  // order by uid ??
          .then((obj) => {
            return obj
          })
      }
    }

  })

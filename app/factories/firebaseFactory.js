app
  .factory('firebaseFactory', function() {
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
      }

      getComp : () => {
        return $http
          .get('https://juxta-position.firebaseio.com/comps.json')
          .then(() => {
            return
          })
      }
    }

  })

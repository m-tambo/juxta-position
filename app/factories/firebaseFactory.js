app
  .factory('firebaseFactory', function($http) {
    return {
      postComp : (nameX, nameY, choice, uid) => {
        let newComp = {
          nameX: nameX,
          nameY: nameY,
          choice: choice,
          uid: uid
        };

        return $http
          .post('https://juxta-position.firebaseio.com/comps.json', newComp)
          .then(() => {
            return newComp
          })
      },

      getComps : (uid) => {
        return $http
          .get('https://juxta-position.firebaseio.com/comps.json')  // order by uid ??
          .then((obj) => {
            return obj.data
          })
      }
    }

  })

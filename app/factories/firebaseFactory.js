app
  .factory('firebaseFactory', function($http) {
    let uid = firebase.auth().currentUser.uid

    return {
      postComp : (nameX, nameY, week, choice) => {
        let newComp = {
          nameX: nameX,
          nameY: nameY,
          week: week,
          choice: choice,
        };

        return $http
          .post(`https://juxta-position.firebaseio.com/comps/${uid}.json`, newComp)
          .then(() => {
            return newComp
          })
      },

      getComps : () => {
        return $http
          .get(`https://juxta-position.firebaseio.com/comps/${uid}.json`)
          .then((obj) => {
            return obj.data
          })
      },

      deleteComp : (id) => {
        return $http
          .delete(`https://juxta-position.firebaseio.com/comps/${uid}/${id}.json`)
      },

      patchNote : (id, note) => {
        let data = {"note": `${note}`}
        return $http
          .patch(`https://juxta-position.firebaseio.com/comps/${uid}/${id}.json`, data)
          .then(() => {
            console.log('note patched', data)
          })
      }

    }
  })

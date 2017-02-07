app
  .factory('firebaseFactory', function() {
    return {
      postComp : () => {
        let newComp = {};

        return $http
          .post('https://freakin-music-history.firebaseio.com/.json', newComp)
          .then(() => {
            return newComp
          })
      }
    }

  })

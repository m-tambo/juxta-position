app
  .factory('apiFactory', function($http) {

    let getPlayers = function () {
      console.log('ready for api call')
      return $http
        .get('http://www.fantasyfootballnerd.com/service/players/json/iz33m4ducg4h​/')
        .then((res) => {
          console.log(res)
        })

    }

    return {
      getPlayers
    }
  })

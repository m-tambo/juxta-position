app
  .factory('apiFactory', function($http) {

    let getPlayers = function () {
      return $http
        .get('nflPlayerList.json')
        .then((res) => {
          return res.data.playerentry
        })

    };

    let getNerdProjections = function () {
      return $http
        .get('https://www.fantasyfootballnerd.com/service/weekly-projections/json/iz33m4ducg4h​/QB/11/')
        .then((res) => {
          console.log(res.data)
        })
    };

    let getNflLeaders = function () {
      return $http
        .get('http://api.fantasy.nfl.com/v1/players/scoringleaders?&count=30&season=2016&position=RB&format=json')
        .then((res) => {
          console.log(res.data)
        })
    };

    return {
      getPlayers,
      getNerdProjections,
      getNflLeaders
    }
  })

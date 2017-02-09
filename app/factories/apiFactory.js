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
        .get(`projectionsQBwk1.json`)
        // .get(`https://www.fantasyfootballnerd.com/service/weekly-projections/json/iz33m4ducg4h/${pos}/${wk}/`)
        .then((res) => {
          console.log(res.data.Projections)
          return res.data.Projections
        })
    };

    let getNflLeaders = function () {
      return $http
        .get('http://api.fantasy.nfl.com/v1/players/scoringleaders?&count=30&season=2016&position=RB&format=json')
        .then((res) => {
          console.log(res.data)
          return res.data
        })
    };

    return {
      getPlayers,
      getNerdProjections,
      getNflLeaders
    }
  })

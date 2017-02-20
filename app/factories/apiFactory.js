app
  .factory('apiFactory', function($http) {

    let getPlayers = function () {
      return $http
        .get('/data/nflPlayerList.json')
        .then((res) => {
          return res.data.playerentry
        })

    };

    let getNerdProjections = function () {
      return $http
        .get(`/data/projectionsQBwk1.json`)
        // .get(`https://www.fantasyfootballnerd.com/service/weekly-projections/json/iz33m4ducg4h/${pos}/${wk}/`)
        .then((res) => {
          return res.data.Projections
        })
    };

    let getNerdRankings = function () {
      return $http
        .get(`/data/rankingsWRweek2.json`)
        // .get(`https://www.fantasyfootballnerd.com/service/weekly-rankings/json/iz33m4ducg4h/WR/${wk}/1/`)
        .then((res) => {
          return res.data.Rankings
        })
    };

    let getNflStats = function () {
      return $http
        //.get(`http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2016&week=6&format=json`)
        .get(`/data/nflWeek6stats.json`)
        .then((res) => {
          return res.data.players
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

    let getSchedule = function () {
      return $http
        // .get('https://www.fantasyfootballnerd.com/service/schedule/json/iz33m4ducg4h/')
        .get('/data/schedule.json')
        .then((res) => {
          // console.log(res.data.Schedule)
          return res.data.Schedule
        })
    }
    return {
      getPlayers,
      getNerdProjections,
      getNerdRankings,
      getNflStats,
      getNflLeaders,
      getSchedule
    }
  })

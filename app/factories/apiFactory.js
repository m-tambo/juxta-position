app
  .factory('apiFactory', function($http) {

    const srvr = `http://localhost:3030` // `http://juxta-proxy.herokuapp.com` //

    let getPlayers = function () {
      return $http
        .get('/data/nflPlayerList.json')
        .then((res) => {
          return res.data.playerentry
        })
    };

    let getNerdProjections = function (pos, wk) {
      return $http
        // .get(`/data/projectionsQBwk1.json`)
        // .get(`https://www.fantasyfootballnerd.com/service/weekly-projections/json/iz33m4ducg4h/${pos}/${wk}/`)
        .get(`${srvr}/nerdprojections/${pos}/${wk}`)
        .then((res) => {
          return res.data.Projections
        })
    };

    let getNerdRankings = function (pos, wk) {
      return $http
        // .get(`/data/rankingsWRweek2.json`)
        // .get(`https://www.fantasyfootballnerd.com/service/weekly-rankings/json/iz33m4ducg4h/${pos}/${wk}/1/`)
        .get(`${srvr}/nerdrankings/${pos}/${wk}`)
        .then((res) => {
          return res.data.Rankings
        })
    };

    let getNflStats = function (wk) {
      return $http
        // .get(`/data/nflWeek6stats.json`)
        // .get(`http://api.fantasy.nfl.com/v1/players/stats?statType=seasonStats&season=2016&week=${wk}&format=json`)
        .get(`${srvr}/weekstats/${wk}`)
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
          return res.data.Schedule
        })
    };

    let getExpertRankings = function (wk, pos, exp) {
      return $http
        // .get(`http://api.fantasy.nfl.com/v1/players/editorweekranks?season=2016&week=${wk}&position=${pos}&format=json&editorId=${exp}&count=100`)
        .get(`${srvr}/espnexperts/${wk}/${pos}/${exp}`)
        .then((res) => {
          console.log("returned expert rankings:", res.data.players)
          return res.data.players
        })
    }
    return {
      getPlayers,
      getNerdProjections,
      getNerdRankings,
      getNflStats,
      getNflLeaders,
      getSchedule,
      getExpertRankings
    }
  })

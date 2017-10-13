app
  .factory('apiFactory', function($http) {

    const srvr = `http://juxta-proxy.herokuapp.com`

    const getPlayers = function () {
      return $http
        .get('/data/nflPlayerList.json')
        .then(res => res.data.players)
    };

    const getNerdProjections = function (pos, wk) {
      return $http
        .get(`${srvr}/nerdprojections/${pos}/${wk}`)
        .then(res => res.data.Projections)
    };

    const getNerdRankings = function (pos, wk) {
      return $http
        .get(`${srvr}/nerdrankings/${pos}/${wk}`)
        .then(res => res.data.Rankings)
    };

    const getNflStats = function (wk) {
      return $http
        .get(`${srvr}/weekstats/${wk}`)
        .then(res => res.data.players)
      };

    const getNflLeaders = function () {
      return $http
        .get('http://api.fantasy.nfl.com/v1/players/scoringleaders?&count=30&season=2016&position=RB&format=json')
        .then(res => res.data)
    };

    const getSchedule = function () {
      return $http
        .get('/data/schedule.json')
        .then(res => res.data.Schedule)
    };

    const getExpertRankings = function (wk, pos, exp) {
      return $http
        .get(`${srvr}/espnexperts/${wk}/${pos}/${exp}`)
        .then(res => res.data.players)
    };

    const getPlayerNews = function () {
      return $http
        .get(`${srvr}/playernews`)
        .then(res => res.data.news)
    }
    return {
      getPlayers,
      getNerdProjections,
      getNerdRankings,
      getNflStats,
      getNflLeaders,
      getSchedule,
      getExpertRankings,
      getPlayerNews
    }
  })

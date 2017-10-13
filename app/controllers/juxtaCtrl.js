app
  .controller('juxtaCtrl', function($scope, authFactory, apiFactory, firebaseFactory, $location, $routeParams, players, playernews) {

  // ______ set variables ______
    $scope.playerList = players  // full list of nfl players
    $scope.nameX = $routeParams.paramX // player x name
    $scope.nameY = $routeParams.paramY // player y name
    $scope.week = $routeParams.week
    $scope.playerNews = playernews


  // _____ radar/bar chart labels _____
    $scope.radarLabels = ["Average projection", "High projection", "Low projection"]
    $scope.barLabels = ["Projected Season Pts", "Actual Season Pts", "Projected Weekly Pts", "Actual Weekly Pts"]
    $scope.series = [$routeParams.paramX, $routeParams.paramY]  // setting series names for bar chart


  // _______ define functions ______
    setPlayers = function (input, output) { // find input player in playerList, set player object to output
      for (let i = 0; i < players.length; i++) {
        if ($scope[input] === ($scope.playerList[i].firstName + " " + $scope.playerList[i].lastName)) {
          $scope[output] = $scope.playerList[i]
        }
      }
    }

    setPlayerNews = function (input, output) {
      $scope[output] = []
      for (let i = 0; i < $scope.playerNews.length; i++) {
        if (input === (playernews[i].firstName + " " + playernews[i].lastName)) {
          $scope[output].push(playernews[i].body.replace(/&apos;/g, "'").replace(/&quot;/g, '"'))
        }
      }
    }

    showProjections = function (guy, letter, pos) {
      apiFactory.getNerdProjections($scope[pos].position, $scope.week)
        .then((projections) => {
          for (i = 0; i < projections.length; i++) {
            if (projections[i].displayName === guy) {   // find matching player
              $scope[letter] = projections[i]
            }
          }
        })
    }

    showRankings = function (dude, letter, pos, posit) {
      $scope.radarData = []
      apiFactory.getNerdRankings($scope[posit].position, $scope.week)
        .then((rankings) => {
          for (j = 0; j < rankings.length; j++) {
            if (rankings[j].name === dude) {   // find matching player
              $scope[letter] = rankings[j];
              $scope[pos] = j + 1;

              $scope.radarData.push([$scope[letter].ppr, $scope[letter].pprHigh, $scope[letter].pprLow]) // assign data to radar graph
            }
          }
        })
    }

    showStats = function (guy, seasonProj, season, weekProj, week) {
      apiFactory.getNflStats($scope.week)
        .then((stats) => {
          for (k = 0; k < stats.length; k++) {
            if (stats[k].name === guy) {  // find matching player
              $scope[seasonProj] = stats[k].seasonProjectedPts;  // assign stats to variables
              $scope[season] = stats[k].seasonPts;
              $scope[weekProj] = stats[k].weekProjectedPts;
              $scope[week] = stats[k].weekPts;

              $scope.barData = [  // inject stat variables into graph
                [$scope.seasonProjectedX, $scope.seasonPtsX, $scope.weekProjectedX, $scope.weekPtsX],
                [$scope.seasonProjectedY, $scope.seasonPtsY, $scope.weekProjectedY, $scope.weekPtsY]
              ]
            }
          }
        })
    }

    showExperts = function (guy, week, position, exp, avg) {
      $scope[exp] = []
      for (i = 1; i < 6; i++) {
        apiFactory.getExpertRankings(week, position, i)
          .then((ranks) => {
            for (k = 0; k < ranks.length; k++) {
              if ((ranks[k].firstName + " " + ranks[k].lastName) === guy) {
                $scope[exp].push(ranks[k].rank)
              }
            }
          })
          .then(() => {
            $scope[avg] = Math.floor(($scope[exp].reduce( ( acc, cur ) => acc + cur, 0 ))/5)
          })
      }
    }


    getOpponents = function (team, opp) {
      apiFactory.getSchedule()
      .then((schedule) =>  {
        for (i = 0; i < schedule.length; i++) {
          if ((schedule[i].gameWeek === $scope.week) && (schedule[i].homeTeam === team)) {
            $scope[opp] = schedule[i].awayTeam  // if home team
          } else
          if ((schedule[i].gameWeek === $scope.week) && (schedule[i].awayTeam === team)) {
            $scope[opp] = schedule[i].homeTeam  // if away team
          }
        }
      })
    }

    $scope.postComparison = function (pick) {  // post to firebase
      if (firebase.auth().currentUser === null) {
        alert("You must login to save this comparison")
      }
      else {
        var $toastContent = $('<span>Juxtaposition saved to your profile.</span>');  // toast
        Materialize.toast($toastContent, 4500, 'rounded');
        firebaseFactory.postComp($routeParams.paramX, $routeParams.paramY, $routeParams.week, pick)
          .then(() => $location.path('/'))
      }
    }

  // ______ execute functions _______
    setPlayers('nameX', 'playerX') // define object $scope.playerX
    setPlayers('nameY', 'playerY') // define object $scope.playerY

    $scope.logoX = `../images/logos/${$scope.playerX.teamAbbr}.png`  // set team logos
    $scope.logoY = `../images/logos/${$scope.playerY.teamAbbr}.png`

    showProjections($routeParams.paramX, 'projectionsX', 'playerX');  // find playerX projections, set obj to var
    showProjections($routeParams.paramY, 'projectionsY', 'playerY');  // find playerY projections, set obj to var

    setPlayerNews($routeParams.paramX, 'newsX')
    setPlayerNews($routeParams.paramY, 'newsY')

    showRankings($routeParams.paramX, 'rankingsX', 'positionXrank', 'playerX')  // grab rankings
    showRankings($routeParams.paramY, 'rankingsY', 'positionYrank', 'playerY')

    showStats($routeParams.paramX, 'seasonProjectedX', 'seasonPtsX', 'weekProjectedX', 'weekPtsX')
    showStats($routeParams.paramY, 'seasonProjectedY', 'seasonPtsY', 'weekProjectedY', 'weekPtsY')


    showExperts($scope.nameX, $scope.week, $scope.playerX.position, 'expertRankX', 'avgRankX')
    showExperts($scope.nameY, $scope.week, $scope.playerY.position, 'expertRankY', 'avgRankY')

    getOpponents($scope.playerX.teamAbbr, 'opponentX')  // set opponent to $scope.opponentX
    getOpponents($scope.playerY.teamAbbr, 'opponentY')  // set opponent to $scope.opponentY


  // _____ materialize stuff _____
    // $('.carousel').carousel({indicators: true})
    $('.carousel.carousel-slider').carousel({fullWidth: true});
  })

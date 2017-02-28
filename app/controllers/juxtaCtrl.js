app
  .controller('juxtaCtrl', function($scope, authFactory, apiFactory, firebaseFactory, $location, $routeParams, players) {
    // console.log('juxtaCtrl firing')

  // ______ set variables ______
    $scope.playerList = players  // full list of nfl players
    $scope.nameX = $routeParams.paramX // player x name
    $scope.nameY = $routeParams.paramY // player y name
    $scope.week = $routeParams.week


  // _____ radar/bar chart labels _____
    $scope.radarLabels = ["Average projection", "High projection", "Low projection"]
    $scope.barLabels = ["Projected Season Pts", "Actual Season Pts", "Projected Weekly Pts", "Actual Weekly Pts"]
    $scope.series = [$routeParams.paramX, $routeParams.paramY]  // setting series names for bar chart


  // _______ define functions ______
    $scope.setPlayers = function (input, output) { // find input player in playerList, set player object to output
      for (let i = 0; i < $scope.playerList.length; i++) {
        if ($scope[input] === ($scope.playerList[i].player.FirstName + " " + $scope.playerList[i].player.LastName)) {
          $scope[output] = $scope.playerList[i]
        }
      }
    }

    $scope.showProjections = function (guy, letter, pos) {
      apiFactory.getNerdProjections($scope[pos].player.Position, $scope.week)
        .then((projections) => {
          // console.log(projections)
          for (i = 0; i < projections.length; i++) {
            if (projections[i].displayName === guy) {   // find matching player
              $scope[letter] = projections[i]
              // console.log($scope[letter])
            }
          }
        })
    }

    $scope.showRankings = function (dude, letter, pos, posit) {
      apiFactory.getNerdRankings($scope[posit].player.Position, $scope.week)
        .then((rankings) => {
          for (j = 0; j < rankings.length; j++) {
            if (rankings[j].name === dude) {   // find matching player
              $scope[letter] = rankings[j];
              $scope[pos] = j + 1;

              $scope.radarData = [  // inject stat variables into graph
                [$scope.rankingsX.ppr, $scope.rankingsX.pprHigh, $scope.rankingsX.pprLow],
                [$scope.rankingsY.ppr, $scope.rankingsY.pprHigh, $scope.rankingsY.pprLow]
              ]
            }
          }
        })
    }

    $scope.showStats = function (guy, seasonProj, season, weekProj, week) {
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

    $scope.showExperts = function (guy, week, position, exp, avg) {
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


    $scope.getOpponents = function (team, opp) {
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
    $scope.setPlayers('nameX', 'playerX') // define object $scope.playerX
    $scope.setPlayers('nameY', 'playerY') // define object $scope.playerY

    $scope.logoX = `/images/logos/${$scope.playerX.team.Abbreviation}.png`  // set team logos
    $scope.logoY = `/images/logos/${$scope.playerY.team.Abbreviation}.png`

    $scope.showProjections($routeParams.paramX, 'projectionsX', 'playerX');  // find playerX projections, set obj to var
    $scope.showProjections($routeParams.paramY, 'projectionsY', 'playerY');  // find playerY projections, set obj to var

    $scope.showRankings($routeParams.paramX, 'rankingsX', 'positionXrank', 'playerX')  // grab rankings
    $scope.showRankings($routeParams.paramY, 'rankingsY', 'positionYrank', 'playerY')

    $scope.showStats($routeParams.paramX, 'seasonProjectedX', 'seasonPtsX', 'weekProjectedX', 'weekPtsX')
    $scope.showStats($routeParams.paramY, 'seasonProjectedY', 'seasonPtsY', 'weekProjectedY', 'weekPtsY')

    $scope.showExperts($scope.nameX, $scope.week, $scope.playerX.player.Position, 'expertRankX', 'avgRankX')
    $scope.showExperts($scope.nameY, $scope.week, $scope.playerY.player.Position, 'expertRankY', 'avgRankY')

    $scope.getOpponents($scope.playerX.team.Abbreviation, 'opponentX')  // set opponent to $scope.opponentX
    $scope.getOpponents($scope.playerY.team.Abbreviation, 'opponentY')  // set opponent to $scope.opponentY


  // _____ materialize stuff _____
    $('.carousel.carousel-slider').carousel({fullWidth: true});

  })

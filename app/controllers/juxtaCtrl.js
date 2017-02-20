app
  .controller('juxtaCtrl', function($scope, authFactory, apiFactory, firebaseFactory, $location, $routeParams, players) {
    console.log('juxtaCtrl firing')

  // ______ set variables ______
    $scope.playerList = players  // full list of nfl players
    $scope.nameX = $routeParams.paramX // player x name
    $scope.nameY = $routeParams.paramY // player y name
    $scope.week = $routeParams.week
    // $scope.uid = firebase.auth().currentUser.uid


  // _____ radar/bar chart labels _____
    $scope.barLabels = ["Projected Season Pts", "Actual Season Pts", "Projected Weekly Pts", "Actual Weekly Pts"]
    $scope.radarLabels = ["Projected Season Pts", "Actual Season Pts", "Projected Weekly Pts", "Actual Weekly Pts"]
    $scope.series = [$routeParams.paramX, $routeParams.paramY]  // setting series names for bar chart


  // _______ define functions ______
    $scope.setPlayers = function (input, output) { // find input player in playerList, set player object to output
      for (let i = 0; i < $scope.playerList.length; i++) {
        if ($scope[input] === ($scope.playerList[i].player.FirstName + " " + $scope.playerList[i].player.LastName)) {
          $scope[output] = $scope.playerList[i]
        }
      }
    }

    $scope.showProjections = function (guy, letter) {
      apiFactory.getNerdProjections()  // (week, pos)
        .then((projections) => {
          // console.log(projections)
          for (i = 0; i < projections.length; i++) {
            if (projections[i].displayName === guy) {   // find matching player
              $scope[letter] = projections[i]
              // console.log($scope[letter])

              $scope.getOpponents(projections[i].team, $scope.week)
            }
          }
        })
    }

    $scope.showRankings = function (dude, letter, pos) {
      apiFactory.getNerdRankings() // (dude, [week#])
        .then((rankings) => {
          for (j = 0; j < rankings.length; j++) {
            if (rankings[j].name === dude) {   // find matching player
              $scope[letter] = rankings[j]
              $scope[pos] = j + 1
              // console.log('position rank:', $scope[pos], 'rankings: ', $scope[letter])
            }
          }
        })
    }

    $scope.showStats = function (guy, seasonProj, season, weekProj, week) {
      apiFactory.getNflStats()
        .then((stats) => {
          for (k = 0; k < stats.length; k++) {
            if (stats[k].name === guy) {  // find matching player
              $scope[seasonProj] = stats[k].seasonProjectedPts  // assign stats to variables
              $scope[season] = stats[k].seasonPts
              $scope[weekProj] = stats[k].weekProjectedPts
              $scope[week] = stats[k].weekPts

              $scope.data = [  // inject stat variables into graph
                [$scope.seasonProjectedX, $scope.seasonPtsX, $scope.weekProjectedX, $scope.weekPtsX],
                [$scope.seasonProjectedY, $scope.seasonPtsY, $scope.weekProjectedY, $scope.weekPtsY]
              ]
            }
          }
        })
    }

    $scope.getOpponents = function (team, week) {
      apiFactory.getSchedule()
      .then(() => console.log(team, week))
    }

    $scope.postComparison = function (pick) {  // post to firebase
      var $toastContent = $('<span>Juxtaposition saved to your profile.</span>');  // toast
      Materialize.toast($toastContent, 4500, 'rounded');
      firebaseFactory.postComp($routeParams.paramX, $routeParams.paramY, $routeParams.week, pick, $scope.uid)
        .then(() => $location.path('/'))
    }


  // ______ run functions _______
    $scope.setPlayers('nameX', 'playerX') // define object $scope.playerX
    $scope.setPlayers('nameY', 'playerY') // define object $scope.playerY

    $scope.showProjections($routeParams.paramX, 'projectionsX');  // find playerX projections, set obj to var
    $scope.showProjections($routeParams.paramY, 'projectionsY');  // find playerY projections, set obj to var

    $scope.showRankings($routeParams.paramX, 'rankingsX', 'positionXrank')
    $scope.showRankings($routeParams.paramY, 'rankingsY', 'positionYrank')

    $scope.showStats($routeParams.paramX, 'seasonProjectedX', 'seasonPtsX', 'weekProjectedX', 'weekPtsX')
    $scope.showStats($routeParams.paramY, 'seasonProjectedY', 'seasonPtsY', 'weekProjectedY', 'weekPtsY')


  // _____ materialize stuff _____
    $('.carousel.carousel-slider').carousel({fullWidth: true});

  })

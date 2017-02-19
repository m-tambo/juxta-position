app
  .controller('juxtaCtrl', function($scope, authFactory, apiFactory, $location, $routeParams) {
    console.log('juxtaCtrl firing')

    console.log($routeParams.paramX, $routeParams.paramY, $routeParams.week)

      // _____ radar/bar chart labels _____
    $scope.barLabels = ["Projected Season Pts", "Actual Season Pts", "Projected Weekly Pts", "Actual Weekly Pts"]
    $scope.radarLabels = ["Projected Season Pts", "Actual Season Pts", "Projected Weekly Pts", "Actual Weekly Pts"]


    $scope.series = [$routeParams.paramX, $routeParams.paramY]  // setting series names for bar chart

  // _______ functions ______

    $scope.showProjections = function (guy, letter) {
      apiFactory.getNerdProjections()  // (guy.Position, [week#])
        .then((projections) => {
          for (i = 0; i < projections.length; i++) {
            if (projections[i].displayName === guy) {   // find matching player
              $scope[letter] = projections[i]
              console.log($scope[letter])
              console.log('good')
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
              console.log('position rank:', $scope[pos], 'rankings: ', $scope[letter])
            }
          }
        })
    }


    $scope.showStats = function (guy, seasonProj, season, weekProj, week) {
      apiFactory.getNflStats()
        .then((stats) => {
          for (k = 0; k < stats.length; k++) {
            if (stats[k].name === guy) {  // find matching player
              $scope[seasonProj] = stats[k].seasonProjectedPts
              $scope[season] = stats[k].seasonPts
              $scope[weekProj] = stats[k].weekProjectedPts
              $scope[week] = stats[k].weekPts

              $scope.data = [
                [$scope.seasonProjectedX, $scope.seasonPtsX, $scope.weekProjectedX, $scope.weekPtsX],
                [$scope.seasonProjectedY, $scope.seasonPtsY, $scope.weekProjectedY, $scope.weekPtsY]
              ]
            }
          }
        })
    }

      // _______ post to firebase _______
    $scope.postComparison = function (pick) {
      var $toastContent = $('<span>Juxtaposition saved to your profile.</span>');
      Materialize.toast($toastContent, 4500, 'rounded');
      firebaseFactory.postComp($routeParams.paramX, $routeParams.paramY, $routeParams.week, pick, $scope.uid)
        .then(() => $location.path('/'))
    }


    $scope.showProjections($routeParams.paramX, 'projectionsX');  // find playerX projections, set obj to var
    $scope.showProjections($routeParams.paramY, 'projectionsY');  // find playerY projections, set obj to var

    $scope.showRankings($routeParams.paramX, 'rankingsX', 'positionXrank')
    $scope.showRankings($routeParams.paramY, 'rankingsY', 'positionYrank')

    $scope.showStats($routeParams.paramX, 'seasonProjectedX', 'seasonPtsX', 'weekProjectedX', 'weekPtsX')
    $scope.showStats($routeParams.paramY, 'seasonProjectedY', 'seasonPtsY', 'weekProjectedY', 'weekPtsY')


    // _____ materialize stuff _____
    $('.carousel.carousel-slider').carousel({fullWidth: true});

  })

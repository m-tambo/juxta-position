app
  .controller('mainCtrl', function(players, $scope, apiFactory, firebaseFactory, $location) {
    console.log('mainCtrl firing')
    $scope.weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12", "Week 13", "Week 14", "Week 15", "Week 16"]
    // $scope.uid = firebase.auth().currentUser.uid;
    $scope.playerList = players;

    $scope.playerNames = {}  // making an object with just player names for auto-complete function
    for (let j = 0; j < players.length; j++) {
      let name = ($scope.playerList[j].player.FirstName + " " + $scope.playerList[j].player.LastName)
      $scope.playerNames[name] = null
    }

      // ____ auto-complete function ____
    $('input.autocomplete').autocomplete({
      data: $scope.playerNames,  // list of player names
      limit: 5,  // max amount of results
    });

      // _____ radar/bar chart labels _____
    $scope.barLabels = ["Projected Season Pts", "Actual Season Pts", "Projected Weekly Pts", "Actual Weekly Pts"]
    $scope.radarLabels = ["Projected Season Pts", "Actual Season Pts", "Projected Weekly Pts", "Actual Weekly Pts"]


    $scope.juxtaPose = function() {
      $scope.inputx = document.querySelector('.input-x').value  // capture the autocomplete values
      $scope.inputy = document.querySelector('.input-y').value  // capture the autocomplete values

      $scope.setPlayers('inputx', 'playerX', 'nameX');
      $scope.setPlayers('inputy', 'playerY', 'nameY');

      $scope.showJuxtaposition();
      $scope.series = [$scope.playerX.player.FirstName, $scope.playerY.player.FirstName]  // setting series names for bar chart

      $scope.showProjections($scope.nameX, 'projectionsX');  // find playerX projections, set obj to var
      $scope.showProjections($scope.nameY, 'projectionsY');  // find playerY projections, set obj to var

      $scope.showRankings($scope.nameX, 'rankingsX', 'positionXrank')
      $scope.showRankings($scope.nameY, 'rankingsY', 'positionYrank')

      $scope.showStats($scope.nameX, 'seasonProjectedX', 'seasonPtsX', 'weekProjectedX', 'weekPtsX')
      $scope.showStats($scope.nameY, 'seasonProjectedY', 'seasonPtsY', 'weekProjectedY', 'weekPtsY')

    }


    $scope.setPlayers = function (input, output, name) {
    // ____ find input player in playerList, set player object to output ____
      for (let i = 0; i < $scope.playerList.length; i++) {
        if ($scope[input] === ($scope.playerList[i].player.FirstName + " " + $scope.playerList[i].player.LastName)) {
          $scope[output] = $scope.playerList[i]
          $scope[name] = ($scope.playerList[i].player.FirstName + " " + $scope.playerList[i].player.LastName)
        }
      }
    }


    $scope.showJuxtaposition = function () {
      if ($scope.playerX === undefined || $scope.playerY === undefined) {
        alert("To see comparison, enter two valid Player names")
      }
      else {
        document.querySelector('.player-versus').removeAttribute('hidden')
        document.querySelector('.table').removeAttribute('hidden')
        document.querySelector('.carousel-slider').removeAttribute('hidden')
        document.querySelector('.choice-btn').removeAttribute('hidden')
        document.querySelector('.player-search').setAttribute('hidden', 'hidden')
      }
    }


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
      firebaseFactory.postComp($scope.nameX, $scope.nameY, pick, $scope.uid)
        .then(() => $location.path('/'))
    }

    // _____ materialize stuff _____
    $('select').material_select();

    $('.carousel.carousel-slider').carousel({fullWidth: true});

  })

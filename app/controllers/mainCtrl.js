app
  .controller('mainCtrl', function(players, $scope, apiFactory) {

    $scope.weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10", "Week 11", "Week 12", "Week 13", "Week 14", "Week 15", "Week 16"]
    $scope.playerList = players;
    console.log(players)

    $scope.playerNames = {}
    for (let j = 0; j < players.length; j++) {
      let name = ($scope.playerList[j].player.FirstName + " " + $scope.playerList[j].player.LastName)
      $scope.playerNames[name] = null
    }

  // ____ auto-complete function ____
    $('input.autocomplete').autocomplete({
      data: $scope.playerNames,  // list of player names
      limit: 5,  // max amount of results
    });


    $scope.juxtaPose = function() {
      $scope.inputx = document.querySelector('.input-x').value  // capture the autocomplete values
      $scope.inputy = document.querySelector('.input-y').value  // capture the autocomplete values

      $scope.setPlayers('inputx', 'playerX');
      $scope.setPlayers('inputy', 'playerY');


      $scope.showProjections($scope.playerX.player, 'projectionsX');  // find playerX projections, set obj to var
      $scope.showProjections($scope.playerY.player, 'projectionsY');  // find playerY projections, set obj to var

      $scope.showRankings($scope.playerX.player, 'rankingsX', 'positionXrank')
      $scope.showRankings($scope.playerY.player, 'rankingsY', 'positionYrank')

      // $scope.showStats()

      $scope.showData();

    }


    $scope.setPlayers = function (input, output) {
    // ____ find input player in playerList, set player object to output ____
      for (let i = 0; i < $scope.playerList.length; i++) {
        if ($scope[input] === ($scope.playerList[i].player.FirstName + " " + $scope.playerList[i].player.LastName)) {
          $scope[output] = $scope.playerList[i]
          // console.log('player:', $scope[output]['player'])
        }
      }
    }


    $scope.showData = function () {
      if ($scope.playerX === undefined || $scope.playerY === undefined) {
        alert("To see comparison, enter two valid Player names")
      }
      else {
        document.querySelector('.player-versus').removeAttribute('hidden')
        document.querySelector('.table').removeAttribute('hidden')
      }
    }


    $scope.showProjections = function (guy, letter) {
      apiFactory.getNerdProjections()  // (guy.Position, [week#])
        .then((projections) => {
          for (i = 0; i < projections.length; i++) {
            if (projections[i].displayName === (guy.FirstName + " " + guy.LastName)) {
              $scope[letter] = projections[i]
              console.log($scope[letter])
            }
          }
        })
    }

    $scope.showRankings = function (dude, letter, pos) {
      apiFactory.getNerdRankings() // (dude, [week#])
        .then((rankings) => {
          for (j = 0; j < rankings.length; j++) {
            if (rankings[j].name === (dude.FirstName + " " + dude.LastName)) {
              $scope[letter] = rankings[j]
              $scope[pos] = j + 1
              console.log('position rank:', $scope[pos], 'rankings: ', $scope[letter])
            }
          }
        })
    }

    $scope.showStats = function () {
      apiFactory.getNflStats()
        .then((stats) => {
          // for (k = 0; k < stats.length; k++) {
            console.log(stats)

        })
    }

  })

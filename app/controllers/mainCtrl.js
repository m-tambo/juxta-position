app
  .controller('mainCtrl', function(players, $scope) {

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

    // ____ find player X ____
      for (let i = 0; i < $scope.playerList.length; i++) {
        if ($scope.inputx === ($scope.playerList[i].player.FirstName + " " + $scope.playerList[i].player.LastName)) {
          $scope.playerX = $scope.playerList[i]
          console.log('player x:', $scope.playerX.player)
        }
      }

    //____ find player Y ____
      for (let i = 0; i < $scope.playerList.length; i++) {
        if ($scope.inputy === ($scope.playerList[i].player.FirstName + " " + $scope.playerList[i].player.LastName)) {
          $scope.playerY = $scope.playerList[i]
          console.log('player y:', $scope.playerY.player)
        }
      }

      $scope.showPlayers()

    }

    $scope.showPlayers = function () {
      if ($scope.playerX === undefined || $scope.playerY === undefined) {
        alert("To see comparison, enter two valid Player names")
      }
      else {
        document.querySelector('.player-versus').removeAttribute('hidden')
      }
    }


    // apiFactory.getNerdProjections()
    // apiFactory.getNflLeaders()

  })

app
  .controller('mainCtrl', function(players, $scope, apiFactory) {

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

      $scope.showPlayers();

      $scope.showProjections($scope.playerX.player, 'projectionsX');  // find playerX projections, set obj to var
      $scope.showProjections($scope.playerY.player, 'projectionsY');  // find playerY projections, set obj to var


    }


    $scope.setPlayers = function (input, output) {
    // ____ find input player in playerList, set player object to output ____
      for (let i = 0; i < $scope.playerList.length; i++) {
        if ($scope[input] === ($scope.playerList[i].player.FirstName + " " + $scope.playerList[i].player.LastName)) {
          $scope[output] = $scope.playerList[i]
          console.log('player:', $scope[output]['player'])
        }
      }
    }


    $scope.showPlayers = function () {
      if ($scope.playerX === undefined || $scope.playerY === undefined) {
        alert("To see comparison, enter two valid Player names")
      }
      else {
        document.querySelector('.player-versus').removeAttribute('hidden')
      }
    }


    $scope.showProjections = function (guy, letter) {
      apiFactory.getNerdProjections()  // ($scope.playerX.player.Position, 7)
        .then((projections) => {
          for (i = 0; i < projections.length; i++) {
            if (projections[i].displayName === (guy.FirstName + " " + guy.LastName)) {
              $scope[letter] = projections[i]
              console.log($scope[letter])
            }
          }
        })
    }

    // apiFactory.getNerdProjections()
    // apiFactory.getNflLeaders()

  })

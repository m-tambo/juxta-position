app
  .controller('mainCtrl', function(players, $scope) {

    $scope.playerList = players;
    console.log(players)

    $scope.juxtaPose = function() {
      // console.log($scope.inputx, $scope.inputy)

      // find player X
      for (let i = 0; i < $scope.playerList.length; i++) {
        if ($scope.inputx === ($scope.playerList[i].player.FirstName + " " + $scope.playerList[i].player.LastName)) {
          $scope.playerX = $scope.playerList[i]
          console.log('player x:', $scope.playerX.player)
        }
      }

      // find player Y
      for (let i = 0; i < $scope.playerList.length; i++) {
        if ($scope.inputy === ($scope.playerList[i].player.FirstName + " " + $scope.playerList[i].player.LastName)) {
          $scope.playerY = $scope.playerList[i]
          console.log('player y:', $scope.playerY.player)
        }
      }

      $scope.showPlayers()

    }

    $scope.showPlayers() {
      if (playerX === undefined || playerY === undefined) {
        alert("To see comparison, enter two valid Player names")
      }
      else {

      }
    }

    // apiFactory.getNerdProjections()
    // apiFactory.getNflLeaders()

  })

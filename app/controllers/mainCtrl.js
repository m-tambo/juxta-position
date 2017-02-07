app
  .controller('mainCtrl', function(apiFactory, $scope) {

    apiFactory.getPlayers()
      .then((res) => {
        // playerList = res;
        console.log(res)
      })

    $scope.juxtaPose = function() {
      $scope.playerXname = document.querySelector('.input-1').value
      $scope.playerYname = document.querySelector('.input-2').value
      console.log($scope.playerXname, $scope.playerYname)
    }

    // apiFactory.getNerdProjections()
    // apiFactory.getNflLeaders()

  })

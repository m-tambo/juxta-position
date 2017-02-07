app
  .controller('mainCtrl', function(apiFactory, $scope) {

    apiFactory.getPlayers()
      .then((res) => {
        // playerList = res;
        console.log(res)
      })

    // apiFactory.getNerdProjections()
    // apiFactory.getNflLeaders()

  })

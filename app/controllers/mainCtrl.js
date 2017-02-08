app
  .controller('mainCtrl', function(players, $scope) {

    $scope.playerList = players;
    console.log(players)

  // ____ auto-complete function ____
    $(function () {
        var single = $('.input-1').materialize_autocomplete({
            multiple: {
                enable: false
            },
            dropdown: {
                el: '#singleDropdown',
                itemTemplate: '<li class="ac-item" data-id="<%= item.id %>" data-text=\'<%= item.text %>\'><a href="javascript:void(0)"><%= item.highlight %></a></li>'
            },
            onSelect: function (item) {
                console.log(item.text + ' was selected');
            }
        });
    });

    $scope.juxtaPose = function() {

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

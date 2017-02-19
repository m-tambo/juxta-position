app
  .controller('mainCtrl', function(players, $scope, apiFactory, firebaseFactory, $location) {
    console.log('mainCtrl firing')
    // $scope.uid = firebase.auth().currentUser.uid;
    $scope.playerList = players;

    $scope.playerNames = {}  // create object with player names and null values for auto-complete function
    for (let j = 0; j < players.length; j++) {
      let name = ($scope.playerList[j].player.FirstName + " " + $scope.playerList[j].player.LastName)
      $scope.playerNames[name] = null;
    }

      // ____ auto-complete function ____
    $('input.autocomplete').autocomplete({
      data: $scope.playerNames,  // list of player names
      limit: 5,  // max amount of results
    });

    $scope.juxtaPose = function() {
      $scope.inputx = document.querySelector('.input-x').value  // capture the autocomplete values
      $scope.inputy = document.querySelector('.input-y').value  // capture the autocomplete values

      $scope.setPlayers('inputx', 'playerX', 'nameX');
      $scope.setPlayers('inputy', 'playerY', 'nameY');

      $scope.showJuxtaposition();

    }


      // ____ find input player in playerList, set player object to output ____
    $scope.setPlayers = function (input, output, name, comboName) {
      for (let i = 0; i < $scope.playerList.length; i++) {
        if ($scope[input] === ($scope.playerList[i].player.FirstName + " " + $scope.playerList[i].player.LastName)) {
          $scope[output] = $scope.playerList[i]
          $scope[name] = ($scope.playerList[i].player.FirstName + " " + $scope.playerList[i].player.LastName)
        }
      }
    }

    $scope.showJuxtaposition = function () {
      if ($scope.playerX === undefined || $scope.playerY === undefined || $scope.selected === undefined) {
        alert("Please enter valid Player names and select a week")
      }
      else {
        $location.url(`/juxta/${$scope.nameX}/${$scope.nameY}/${$scope.selected}`)
      }
    }


      // _____ materialize stuff _____
    $('select').material_select();

    $('select').change((e) => $scope.selected = e.target.value) // setting the selected week to $scope.selected


  })

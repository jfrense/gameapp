var app = angular.module('gameapp',[]);

app.controller('mainController', function($scope,$http) {
    $scope.games = [];

  $http.get('/api/games')
    .success(function(data){
      $scope.games = data;
      console.log("hiii");
      console.log(data);

    })
    .error(function(data) {
      console.log('Error' + data);
    });
});

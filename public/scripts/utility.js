var app = angular.module("myApp", []);

// Requests go to the server that is running locally
app.controller("myCtrl", function($scope, $http) {
    
    $http({
        method: 'GET',
        url: 'http://localhost:3000/',
        headers: { 
            'Content-Type': 'application/json'
        }
    })
    .then(function(response) {
        $scope.result = response.data.data;
        console.log("OK:", $scope.result);
    }).catch(function (data) {
        console.log("ERROR:", data);
    });
    
});
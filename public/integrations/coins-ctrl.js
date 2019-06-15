/* global angular */

angular
    .module("EmploymentsApp")
    .controller("CoinsCtrl", ["$scope", "$http", function($scope, $http) {

        console.log("Currency exchange controller initialized");
        var API = "https://awesomeapi-exchange.p.rapidapi.com/json/all";
        
        refresh();
    
        function refresh() {
            var config = {
                headers: {
                    "X-RapidAPI-Host": "awesomeapi-exchange.p.rapidapi.com",
                    "X-RapidAPI-Key": "e2602a8e3fmsha2e3bde47f7b582p1b8057jsnb0ebc55ccbb3",
                }
            };
            
            console.log("Requesting currency exchange to <" + API + ">...");
            
            $http.get(API, config).then(function(response) {
                console.log("Data received:" + JSON.stringify(response.data, null, 2));
                $scope.coins = response.data;
            });
        }
    }]);

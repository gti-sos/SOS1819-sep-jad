/* global angular */

angular
    .module("EmploymentsApp")
    .controller("WeatherCtrl", ["$scope", "$http", function($scope, $http) {

        console.log("Weather controller initialized");
        
        var API = "proxyWeather";
    
        refresh();

        function refresh() {
            
            var config={
                headers: { 
                    "city": "londres"
                }
            };
            console.log("Requesting city weather to <" + API + ">...");
    
            $http.get(API, config).then(function(response) {
                    
                    console.log("Data received:" + JSON.stringify(response.data, null, 2));

                    console.log(response.data);
                    
                    console.log(response.data.name);
                    
                    $scope.weathers = response.data;
                    
                    console.log($scope.weathers.name);
                });
            }
        }]);

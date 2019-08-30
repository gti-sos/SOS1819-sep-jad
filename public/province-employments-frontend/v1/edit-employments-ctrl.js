/* global angular */

angular
    .module("EmploymentsApp")
    .controller("EditEmploymentsCtrl", ["$scope","$http","$routeParams","$location",
        function($scope,$http,$routeParams,$location) {
            console.log("Edit Controller initialized");
            var API = "/api/v1/province-employments";
            var province = $routeParams.province;
            var year = $routeParams.year;
            var update = true;
            console.log("Requesting province employment <"+API+"/"+province+"/"+year+">...");

            $http.get(API+"/"+province+"/"+year).then(function(response) {
                console.log("Data Received: "+ JSON.stringify(response.data, null, 2));

                $scope.provinceEmployment = response.data;

            });

            $scope.updateProvinceEmployment = function(province,year) {
                console.log("Updating province employment: "+ JSON.stringify($scope.provinceEmployment));

                Object.keys($scope.provinceEmployment).forEach(d => {
                    if ($scope.provinceEmployment[d] == "") {
                        $scope.status = "Recurso no actualizado. Falta parametros"
                        update = false;
                    }
                })
                
                if (update) {
                    $http
                        .put(API+"/"+province+"/"+year, $scope.provinceEmployment)
                        .then(function(response) {
                                $scope.status = response.status;
                            },
                            function(error) {
                                $scope.status = error.status;
                            });
                    $location.path("/ui/v1/province-employments");
                }
                update = true;
            };
        }
    ]);

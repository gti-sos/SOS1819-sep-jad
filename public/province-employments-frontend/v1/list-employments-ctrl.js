/* global angular */

angular
    .module("EmploymentsApp")
    .controller("ListEmploymentsCtrl",["$scope","$http", function($scope,$http) {
        console.log("List controller initialized");
        var API = "/api/v1/province-employments";
        var limit = 0;          // por defecto listamos todos los recursos sin paginar
        var offset = 0;
        
        refresh();
        
        $scope.pagingEmployments = function() {
            limit = 6;
            $scope.status = "Datos paginados de 6 en 6";
            refresh();
        };
        
         $scope.unpagingEmployments = function() {
            limit = 0;
            $scope.status = "Datos no paginados";
            refresh();
        };  

        function refresh() {
            console.log("Requesting employments to <"+API+">...");
            
            $http.get(API+"?limit="+limit+"&offset="+offset).then(function(response) {
                console.log("Data received:" + JSON.stringify(response.data, null, 2));
                $scope.provinceEmployments = response.data;
            });
        }


        $scope.getNext = function() {
            $http.get(API+"?limit="+limit+"&offset="+offset).then(function(response) {
            if ((response.data).length == limit) {
                offset = offset + limit;
            }
            
            $http.get(API+"?limit="+limit+"&offset="+offset).then(function(response) {  // por que lo repite??
                $scope.provinceEmployments = response.data;
            });
            }, function Error(response) {
                $scope.provinceEmployments = [];
            });
        };


        $scope.getBack = function() {
            if (offset >= limit) {
                offset = offset - limit;
            }
            
            $http.get(API+"?limit="+limit+"&offset="+offset).then(function(response) {
                $scope.provinceEmployments = response.data;
                }, function Error(response) {
                    $scope.provinceEmployments = [];
                });
        };
   
        
        $scope.loadProvinceEmployments = function() {
            $http.get(API+"/loadInitialData").then(function(response) {
                $scope.status = "BD original vacia. Datos iniciales cargados con exito";
                refresh();
                }, function(error) {
                 $scope.status = "BD con datos. No realizada carga inicial de datos";
                    refresh();
                });
        };


        $scope.addProvinceEmployment = function() {
            var newProvinceEmployment = $scope.newProvinceEmployment;
            console.log("Adding a new provinceEmployment: "+JSON.stringify(newProvinceEmployment));
            $http
                .post(API,newProvinceEmployment)
                .then(function(response) {
                    console.log("POST response: "+response.status+" "+response.data);
                    $scope.status = "El recurso "+newProvinceEmployment.province+"-"+newProvinceEmployment.year+" se ha añadido con exito";
                    refresh();
                }, function(error) {
                    if (error.status == 409) {
                        $scope.status = "Ya existe el recurso "+newProvinceEmployment.province+"-"+newProvinceEmployment.year;
                        refresh();
                    } else {
                        $scope.status = "Alguno de los campos no ha sido rellenado correctamente";
                        refresh();
                    }
                });
        };


        $scope.deleteProvinceEmployment = function(province, year) {
            console.log("Delete employment with province: "+province+" and year: "+year);
            $http
                .delete(API+"/"+province+"/"+year)
                .then(function(response) {
                    console.log("DELETE response: "+response.status+" "+response.data);
                    $scope.status = "El recurso "+province+"-"+year+" se ha borrado con exito";
                    $scope.getBack();
                }, function(error) {
                        $scope.status = "El recurso "+province+"-"+year+" no existe";
                        refresh();
                    });
        };

        $scope.deleteProvinceEmployments = function() {
            $http
                .delete(API)
                .then(function(response) {
                    $scope.status = "Los recursos se han borrado correctamente";
                    refresh();
                });
        };


        $scope.searchByProvince = function() {
            $http.get(API+"/"+$scope.searchProvince).then(function(response) {
                console.log("SEARCH response: " + response.status + " " + response.data);
                
                $scope.provinceEmployments = response.data;
                }, function(error) {
                    $scope.status = "No existe el recurso " + $scope.searchProvince;
                });
        };

        $scope.searchByYear = function() {
            $http.get(API+"?from="+$scope.fromYear+"&to="+$scope.toYear).then(function(response) {
                console.log("SEARCH response: " + response.status + " " + response.data)
                
                $scope.provinceEmployments = response.data;
            });
        };

        $scope.limit = limit;
        $scope.offset = offset;
    }]);

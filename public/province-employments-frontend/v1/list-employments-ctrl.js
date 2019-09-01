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
            limit = 10;
            $scope.status = "Datos paginados de "+limit+" en "+limit;
            refresh();
        };
        
         $scope.unpagingEmployments = function() {
            limit = 0;
            $scope.status = "Datos no paginados";
            refresh();
        };  

        function refresh() {			// Funcion para reinicializar frontend (muestra los datos iniciales)
            console.log("Requesting employments to <"+API+">...");       
            $http
				.get(API+"?limit="+limit+"&offset="+offset)
				.then(function(response) {
                	console.log("Data received:" + JSON.stringify(response.data, null, 2));
                	$scope.provinceEmployments = response.data;
            	});
        };


        $scope.getNext = function() {
            $http
				.get(API+"?limit="+limit+"&offset="+offset)
				.then(function(response) {
            		if ((response.data).length == limit) {
                		offset = offset + limit;
            		}
					$http
						.get(API+"?limit="+limit+"&offset="+offset)
						.then(function(response) {  // por que lo repite??
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
            
            $http
				.get(API+"?limit="+limit+"&offset="+offset)
				.then(function(response) {
                	$scope.provinceEmployments = response.data;
                }, function Error(response) {
                    	$scope.provinceEmployments = [];
                	});
        };
   
        
        $scope.loadProvinceEmployments = function() {
            $http
				.get(API+"/loadInitialData")
				.then(function(response) {
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


        $scope.searchByProvinceOrYear = function() {
            if($scope.provinceYear=="year"){	
				$http
					.get(API+"/"+$scope.data)
					.then(function(response) {
						console.log("SEARCH response: " + response.status + " " + response.data);
						$scope.provinceEmployments = response.data;					
					}, function(error) {
							$scope.status = "No existe el recurso " + $scope.data;
							refresh();
						});
				
			}
			else if($scope.provinceYear=="province"){
				$http
					.get(API+"/"+$scope.data)
					.then(function(response) {
						console.log("SEARCH response: " + response.status + " " + response.data);
						$scope.provinceEmployments = response.data;
					}, function(error) {
							$scope.status = "No existe el recurso " + $scope.data;
							refresh();
						});
			}
			$scope.provinceYear="";
			$scope.data="";
        };


        $scope.searchByOther = function() {
			URL = API;
			fromOther = "";
			toOther = "";
			$scope.status = "";
			
			if($scope.province == "")
			{
				if($scope.other == "year"){
					if(($scope.from == "") && ($scope.to == ""))   
						URL = URL+"?"+$scope.year;
					else
						URL = URL+"?"+"from="+$scope.from+"&to="+$scope.to;
			
				}else{
					switch ($scope.other) {
						case "industryEmployment":
							fromOther = "fromIndustry";
							toOther = "toIndustry";
							break;

						case "buildingEmployment":
							fromOther = "fromBuilding";
							toOther = "toBuilding";
							break;

						case "servicesEmployment":
							fromOther = "fromServices";
							toOther = "toServices";
							break;

						default:
							return;
					}
					URL = URL+"?"+fromOther+"="+$scope.from+"&"+toOther+"="+$scope.to;	
				}		
				
			} else {
				if(($scope.other == "") && ($scope.from == "") && ($scope.to == ""))
					URL = URL+"?province="+$scope.province;
				
				else if(($scope.other == "year") && ($scope.from != "") && ($scope.to != ""))
					URL = URL+"?province="+$scope.province+"&from="+$scope.from+"&to="+$scope.to;
				else
					URL = "error";			
			}		
					
			if (URL != "error") {
				$http
					.get(URL)
					.then(function(response) {
                		console.log("SEARCH response: " + response.status + " " + response.data)
                		$scope.provinceEmployments = response.data;
						if (response.data.length == 0) $scope.status = "No hay resultados";
					}, function(error) {
                    		$scope.status = "Se ha producido un error";
							refresh();
                		});
			
			} else {
				$scope.status = "Busqueda erronea";
				refresh();
			}
		
			// $scope.limit = limit;
			// $scope.offset = offset;
			$scope.province = "";
			$scope.other = "";
			$scope.from = "";
			$scope.to = "";
    	};
    }
]);	

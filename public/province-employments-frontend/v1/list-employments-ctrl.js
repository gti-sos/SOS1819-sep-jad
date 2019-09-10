/* global angular */

angular
    
	.module("EmploymentsApp")
    
	.controller("ListEmploymentsCtrl",["$scope","$http", function($scope,$http) {
    
		console.log("List controller initialized");
        
		var API = "/api/v1/province-employments";
		var searchURL = API;
        var limit = 0;          // por defecto listamos todos los recursos sin paginar
        var offset = 0;
        
        refresh();
        
        $scope.pagingEmployments = function() {
            limit = 10;
            $scope.status = "Datos paginados de "+limit+" en "+limit;
            refresh();
        };
        
        $scope.reset = function() {
            
			limit = 0;
			offset = 0;
			searchURL = API;
            
			$scope.status = "Mostrando todos los recursos";
		/*	
			$scope.newProvinceEmployment.province = "";
			$scope.newProvinceEmployment.year = "";
			$scope.newProvinceEmployment.industryEmployment = "";
			$scope.newProvinceEmployment.buildingEmployment = "";
			$scope.newProvinceEmployment.servicesEmployment = "";
		*/	
			refresh();
        };  

        function refresh() {			// Funcion para refrescar datos mostrados en frontend
            
			console.log("Requesting employments to <"+API+">...");       
            
			if (searchURL == API)
				URL = API+"?limit="+limit+"&offset="+offset;
			else
				URL = searchURL+"&limit="+limit+"&offset="+offset;
			$http
				.get(URL)
				.then(function(response) {
					console.log("Data received:" + JSON.stringify(response.data, null, 2));
					$scope.provinceEmployments = response.data;
				});
	    };


        $scope.getNext = function() {
            
			offset = offset + limit;
			
			if (searchURL == API)
				URL = API+"?limit="+limit+"&offset="+offset;
			else
				URL = searchURL+"&limit="+limit+"&offset="+offset;
			
			$http
				.get(URL)
				.then(function(response) { 
					$scope.provinceEmployments = response.data;
				}, function (error) {
					$scope.provinceEmployments = [];
					});			
        };


        $scope.getBack = function() {
            
			if (offset >= limit) {
                offset = offset - limit;
            }
            
			if (searchURL == API)
				URL = API+"?limit="+limit+"&offset="+offset;
			else
				URL = searchURL+"&limit="+limit+"&offset="+offset;
			
            $http
				.get(URL)
				.then(function(response) {
                	$scope.provinceEmployments = response.data;
                }, function (error) {
                    	$scope.provinceEmployments = [];
                	});
        };
   
        
        $scope.loadProvinceEmployments = function() {
            
			limit = 0;
			offset = 0;
			searchURL = API;
			
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
            
			limit = 0;
			offset = 0;
			searchURL = API;
			
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
                        $scope.reset();
                    });
        };

        $scope.deleteProvinceEmployments = function() {
            
			limit = 0;
			offset = 0;
			searchURL = API;
			
			$http
                .delete(API)
                .then(function(response) {
                    $scope.status = "Los recursos se han borrado correctamente";
                    refresh();
                });
        };


        $scope.searchByProvinceOrYear = function() {
            	
			$http
				.get(API+"/"+$scope.data)
				.then(function(response) {
					console.log("SEARCH response: " + response.status + " " + response.data);
					$scope.provinceEmployments = response.data;					
				}, function(error) {
						$scope.status = "No existen recursos " + $scope.provinceYear + ": "+ $scope.data;
						$scope.reset();
					});
				
			$scope.provinceYear="";
			$scope.data="";
        };


        $scope.searchByOther = function() {
			searchURL = API;
			fromOther = "";
			toOther = "";
			$scope.status = "";
			
			if($scope.province == "")
			{
				if($scope.other == "year"){
					if(($scope.from == "") && ($scope.to == ""))   
						searchURL = searchURL+"?"+$scope.year;
					else
						searchURL = searchURL+"?"+"from="+$scope.from+"&to="+$scope.to;
			
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
					searchURL = searchURL+"?"+fromOther+"="+$scope.from+"&"+toOther+"="+$scope.to;	
				}		
				
			} else {
				if(($scope.other == "") && ($scope.from == "") && ($scope.to == ""))
					searchURL = searchURL+"?province="+$scope.province;
				
				else if(($scope.other == "year") && ($scope.from != "") && ($scope.to != ""))
					searchURL = searchURL+"?province="+$scope.province+"&from="+$scope.from+"&to="+$scope.to;
				else
					searchURL = "error";			
			}		
					
			if (searchURL != "error") {
				$http
					.get(searchURL)
					.then(function(response) {
                		console.log("SEARCH response: " + response.status + " " + response.data)
                		$scope.provinceEmployments = response.data;
						if (response.data.length == 0) $scope.status = "No hay resultados";
					}, function(error) {
                    		$scope.status = "Se ha producido un error";
							$scope.reset();
                		});
			
			} else {
				$scope.status = "Busqueda erronea";
				$scope.reset();
			}

			$scope.province = "";
			$scope.other = "";
			$scope.from = "";
			$scope.to = "";
    	};
    }
]);	

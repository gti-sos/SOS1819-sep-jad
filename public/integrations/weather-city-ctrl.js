/* global angular */
/* global anychart*/

angular
    .module("EmploymentsApp")

    .controller("WeatherCtrl", ["$scope", "$http", function($scope, $http) {
     		
			console.log("Weather controller initialized");

			var employmentsAPI = "/api/v1/province-employments";
			var API = "proxyWeather";
			var year = "2018";
			var listProvices = [];
			
			$http
				.get(employmentsAPI).then(function(response) {
					
					listProvinces = (response.data)
								.filter(function(d) {if(d.year == year) return d;})
								.map(function(d) {return d.province});
					
					$scope.provinces = listProvinces;
				});
		
		 	$scope.employmentAndWeather = function(province) {

				refresh();

				function refresh() {

					var config={
						headers: { 
							"city": province
						}
					};

					$http
						.get(employmentsAPI+"/"+province+"/"+year).then(function(response) {

							console.log("SEARCH response: " + response.status + " " + response.data);

							provinceEmployment = response.data;

							console.log("Requesting city weather to <" + API + ">...");

							$http.get(API, config).then(function(response) {

								console.log("Data received:" + JSON.stringify(response.data, null, 2));

								console.log(response.data);

								console.log(response.data.name);

								anychart.onDocumentReady(function () {

									var chart = anychart.polar();

									var columnSeries = chart.column([
										{x: 'sector industria', value: (provinceEmployment.industryEmployment)/1000},  // empleos en miles
										{x: 'sector construccion', value: (provinceEmployment.buildingEmployment)/1000},
										{x: 'sector servicios', value: (provinceEmployment.servicesEmployment)/1000},
										{x: 'temperatura', value: (response.data.main.temp)-273.15},  // pasamos de Kelvin a Centigrados
										{x: 'humedad', value: response.data.main.humidity},
										{x: 'presion', value: response.data.main.pressure}
									]);

									// set series name
									columnSeries.name('valor');

									// set title settings
									chart.title()
											.enabled(true)
											.text(province)
											.padding({bottom: 20});

									// disable y-axis
									chart.yAxis(false);

									// set value prefix for tooltip
									chart.tooltip().valuePrefix('');

									// set x-scale
									chart.xScale('ordinal');

									// set chart container id
									chart.container('container');

									// initiate chart drawing
									chart.draw();
								});
							});
						});
					}
				}
		}]);

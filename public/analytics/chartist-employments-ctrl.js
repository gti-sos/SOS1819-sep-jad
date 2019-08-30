/* global angular */
/* global Chartist */

angular
    .module("EmploymentsApp")
    .controller("ChartistEmploymentsCtrl", ["$scope","$http","$routeParams",
        function($scope,$http,$routeParams) {
			
            var API = "/api/v1/province-employments";
            var provinceEmployments = [];
            var dataChart = [];
            
            $http
				.get(API)
				.then(function(response) {

					provinceEmployments = response.data;
					dataChart = provinceEmployments         // ordenamos los recursos por anos (de mas a menos reciente)
						.sort(function(a, b) {
							return parseInt(b.year) - parseInt(a.year);
						});

					Chartist.Line('.ct-chart', {
						labels: dataChart.map(function(d) {return d.province+((d.year).slice(-2))}),
						series: [
							dataChart.map(function(d) {return d.industryEmployment}),
							dataChart.map(function(d) {return d.buildingEmployment}),
							dataChart.map(function(d) {return d.servicesEmployment})
						]
						}, {
							fullWidth: true,
							chartPadding: {
								right: 40
							}
						});
            });
        }
    ]);

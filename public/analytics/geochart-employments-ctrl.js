/* global angular */
/* global google */

angular
    .module("EmploymentsApp")
    .controller("GeochartEmploymentsCtrl", ["$scope",
        "$http",
        "$routeParams",
        function($scope, $http, $routeParams) {

            var API = "/api/v1/province-employments";
            var provinceEmployments = [];
            var dataFilteredYear = [];
			var dataChart = [];
            var year = "2018";
            
            $http.get(API).then(function(response) {
                
                provinceEmployments = response.data;
                
                google.charts.load('current', {
                    'packages': ['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    mapsApiKey: 'AIzaSyCAx8dNAT7kroaGiuw0uuNZJrPRNWBKMCo'
                });
                google.charts.setOnLoadCallback(drawMarkersMap);
                
                function drawMarkersMap() {
                    
                    dataFilteredYear = provinceEmployments
                        .filter(function(d) {if(d.year == year) return d;}); 

                    dataChart.push(['Province', 'Industry']);
                    
                    dataFilteredYear.forEach(function (d) {
                        dataChart.push([d.province, d.industryEmployment]);
                    });
                    
                    var dataPlot = google.visualization.arrayToDataTable(dataChart);
                    
                    var options = {
                        region:'ES',
                        displayMode: 'markers'
                    };

                    var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));

                    chart.draw(dataPlot, options);
                }
            });
        }
    ]);

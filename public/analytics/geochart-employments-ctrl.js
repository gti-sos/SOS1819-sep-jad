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

            $http.get(API).then(function(response) {
                google.charts.load('current', {
                    'packages': ['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    mapsApiKey: 'AIzaSyCygDfdkLa2XxPmP2-rkSsW_eWPcYLGimc'
                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {
                    var data = [];

                    provinceEmployments = response.data;

                    data.push(['comunidad', 'provincia', 'Industry Employment']);
                    data.push(['ES-AN', provinceEmployments[0].province, parseInt(provinceEmployments[0].industryEmployment)]);
                    data.push(['ES-MD', provinceEmployments[1].province, parseInt(provinceEmployments[1].industryEmployment)]);
                    
                    var plot = google.visualization.arrayToDataTable(data);
                    
                    var options = {
                        region:'ES',
                        resolution: 'provinces'
                    };

                    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                    chart.draw(plot, options);
                }
            });
        }
    ]);

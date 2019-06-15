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
            var data = [];
            var dataChart = [];
            var year = "2018";
            
            $http.get(API).then(function(response) {
                
                provinceEmployments = response.data;
                
                google.charts.load('current', {
                    'packages': ['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    mapsApiKey: 'AIzaSyCygDfdkLa2XxPmP2-rkSsW_eWPcYLGimc'
                });
                google.charts.setOnLoadCallback(drawRegionsMap);
                
                function codeComunity(prov) {
                    var codeProv = ""
                    var listCode = [{
                            "province": "badajoz",
                            "code": "ES-EX"
                        },{
                            "province": "barcelona",
                            "code": "ES-CT"
                        },{
                            "province": "madrid",
                            "code": "ES-MD"
                        },{
                            "province": "sevilla",
                            "code": "ES-AN" 
                        },{
                            "province": "valencia",
                            "code": "ES-VC"
                        },{
                            "province": "vizcaya",
                            "code": "ES-PV"
                        }]; 
                    
                    listCode.forEach(function(d) {
                        if (d.province == prov)
                            codeProv = d.code;
                        });
                    
                    return codeProv;
                }

                function drawRegionsMap() {
                    
                    dataChart = provinceEmployments
                        .filter(function(d) {if(d.year == year) return d;}); 

                    data.push(['comunidad', 'provincia', 'Industry', 'Building']);
                    
                    dataChart.forEach(function (d) {
                        data.push([codeComunity(d.province), d.province, d.industryEmployment, d.buildingEmployment]);
                    });
                    
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

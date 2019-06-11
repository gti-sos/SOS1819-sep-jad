/* global angular */
/* global google */

// Note: you will need to get a mapsApiKey for your project.
// See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings

angular
    .module("EmploymentsApp")
    .controller("GeochartEmploymentsCtrl", ["$scope","$http","$routeParams",
        function($scope,$http,$routeParams) {

            var API = "/api/v1/province-employments";
            var provinceEmployments = [];
            var year ="2018";

            $http.get(API).then(function(response) {
                
                google.charts.load('current', {
                    'packages':['geochart'],
                    'mapsApiKey':'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                });
      
                google.charts.setOnLoadCallback(drawRegionsMap);
    
                function drawRegionsMap() {
            /*      var data = [], arrayChartData = [];

                   
                    'AIzaSyAWP2s6Ig8jf8I2br3Vdado-QaZvzdMBcg'
  
                    provinceEmployments = response.data;
          
                      var options = {
                        'title':'Spain',
                        'region':'ES',
                        'resolution':'provinces'
                        };
            
                    data = provinceEmployments.
                            filter(function(d) {if(d.year == year) return d;});
            
                    arrayChartData.push(["Province", "Industry Employment"]);
                    data.
                        forEach(function (d) {arrayChartData.push([d.province, d.industryEmployment]);
                    });
          
                    var chartData = google.visualization.arrayToDataTable(arrayChartData)
             */      
                    var data = google.visualization.arrayToDataTable([
                        ['ES-SE', 200],
                        ['ES-CO', 700]
                    ]);
                    
                    var options = {
                        region:'ES',
                        resolution:'provinces',
                        displayMode: 'text'
                    };
                    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
            
                    chart.draw(data, options);
                }
            });
        }
    ]);

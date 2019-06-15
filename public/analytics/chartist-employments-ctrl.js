/* global angular */
/* global Chartist */

angular
    .module("EmploymentsApp")
    .controller("ChartistEmploymentsCtrl", ["$scope","$http","$routeParams",
        function($scope,$http,$routeParams) {

            var API = "/api/v1/province-employments";
            var provinceEmployments = [];
            var dataChart = [];
            
            $http.get(API).then(function(response) {

                provinceEmployments = response.data;
                dataChart = provinceEmployments         // ordenamos los recursos por año (de mas a menos reciente)
                    .sort(function(a, b) {
                        return parseInt(b.year) - parseInt(a.year);
                    });
/*                 
var data = {

    //my labels
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],

    //my multiple series
    series: [
        //series1: label example: apples
        {
          className: 'apples',
          name: 'My nice apples',
          data: [5, 2, 4, 2, 0],
        },
        {
        //series1: label example: lemons
          className: 'lemons',
          name: 'My nice lemons',
          data: [8, 1, 14, 12, 10],
        }
    ]
}
*/

                Chartist.Line('.ct-chart', {
                    labels: [dataChart.map(function(d) {return ([d.year, d.province])})],
                    series: [
                        {
                            ClassName: 'pepe',
                            name:  'pepito',
                            data:   dataChart.map(function(d) {return d.industryEmployment}),
                        },
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


/* global angular */
/* global Highcharts */

angular
    .module("EmploymentsApp")
    .controller("HighchartsEmploymentsCtrl", ["$scope","$http","$routeParams",
        function($scope,$http,$routeParams) {

            var API = "/api/v1/province-employments";
            var provinceEmployments = [];
            var dataChart = [];
            var province = "sevilla";

            $http.get(API).then(function(response) {

                provinceEmployments = response.data;
                dataChart = provinceEmployments
                    .filter(function(d) {if(d.province == province) return d;})  
                    .sort(function(a, b) {
                        return parseInt(b.year) - parseInt(a.year);
                });

                Highcharts.chart('province_container', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Evolution of employments in a province by sectors'
                    },
                    subtitle: {
                        text: 'Province: Sevilla'
                    },
                    xAxis: {
                        categories: dataChart.map(function(d) {return d.year}),
                        title: {
                            text: 'years'
                        }
                    },
                    yAxis: {
                        min: 30000,
                        title: {
                            text: 'Employments (ud)',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: null
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 80,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor:
                            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                        shadow: true
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: 'Industry',
                        data: dataChart.map(function(d) {return parseInt(d.industryEmployment)})
                    }, {
                        name: 'Building',
                        data: dataChart.map(function(d) {return parseInt(d.buildingEmployment)})
                    }, {
                        name: 'Services',
                        data: dataChart.map(function(d) {return parseInt(d.servicesEmployment)})
                    }]
                });
            });
        }
    ]);


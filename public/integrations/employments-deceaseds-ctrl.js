/* global angular */
/* global Highcharts */

angular
    .module("EmploymentsApp")
    .controller("EmploymentsDeceasedsCtrl", ["$scope", "$http", function($scope, $http) {
        
        console.log("EmploymentsDeceaseds Controller initialized.");
    
        var employmentsAPI = "/api/v1/province-employments";
        var deceasedsAPI = "https://sos1819-14.herokuapp.com/api/v1/deceaseds";
        var dataEmployments = [];
        var dataDeceaseds = [];
        var filteredEmployments = [];
        var filteredDeceaseds = [];
        var dataChart = [];
        var year = 2018;
        
        refresh();
    
        function refresh() {
    
            $http.get(employmentsAPI).then(function(responseEmployments) {
                $http.get(deceasedsAPI).then(function(responseDeceaseds) {
                    
                    dataEmployments = responseEmployments.data;
                    dataDeceaseds = responseDeceaseds.data;
                    
                    $scope.deceaseds = responseDeceaseds.data;
                   
                    // Seleccionamos los recursos de un año determinado
                    
                    filteredEmployments = dataEmployments  
                        .filter(function(d) {if((parseInt(d.year)) == year) return d;});
                    
                    filteredDeceaseds = dataDeceaseds
                        .filter(function(d) {if(d.year == year) return d;});
 
                    console.log(filteredEmployments);
                    
                    console.log(filteredDeceaseds);                    

                    // Creamos un array con los datos a representar 
                    
                    filteredDeceaseds.forEach(function(d) {
                        filteredEmployments.forEach(function(e) {
                            if((d.province).toLowerCase() == e.province)
                                dataChart.push({
                                    "province": e.province,
                                    "industryEmployment": e.industryEmployment,
                                    "buildingEmployment": e.buildingEmployment,
                                    "servicesEmployment": e.servicesEmployment,
                                    "deceaseds": parseInt(d.number),
                                });    
                            });
                        });

                    console.log(dataChart);
                    
                    console.log(dataChart.map(function(d) {return d.province}));
                    
                    Highcharts.chart('integration_SOS_14_container', {
                        title: {
                            text: 'Comparative (by provinces) between employments and deaths due to traffic accidents (year: 2018)'
                        },
                        xAxis: {
                            categories: dataChart.map(function(d) {return d.province})
                        },
                        labels: {
                            items: [{
                                html: '',
                                style: {
                                    left: '50px',
                                    top: '18px',
                                    color: ( // theme
                                        Highcharts.defaultOptions.title.style &&
                                        Highcharts.defaultOptions.title.style.color
                                    ) || 'black'
                                }
                            }]
                        },
                        series: [{
                            type: 'column',
                            name: 'Industry',
                            data: dataChart.map(function(d) {return d.industryEmployment})
                        }, {
                            type: 'column',
                            name: 'Building',
                            data: dataChart.map(function(d) {return d.buildingEmployment})
                        }, {
                            type: 'column',
                            name: 'Services',
                            data: dataChart.map(function(d) {return d.servicesEmployment})
                        }, {
                            type: 'spline',
                            name: 'deceaseds',
                            data: dataChart.map(function(d) {return d.deceaseds}),
                            marker: {
                                lineWidth: 2,
                                lineColor: Highcharts.getOptions().colors[3],
                                fillColor: 'white'
                            }
                        }]
                    });
                });
            });
        }
    }]);
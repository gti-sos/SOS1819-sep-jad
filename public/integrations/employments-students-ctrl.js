/* global angular */
/* global Highcharts */

angular
    .module("EmploymentsApp")
    .controller("EmploymentsStudentsCtrl", ["$scope", "$http", function($scope, $http) {
        
        console.log("EmploymentsStudents Controller initialized.");
    
        var employmentsAPI = "/api/v1/province-employments";
        var studentsAPI = "https://sos1819-05.herokuapp.com/api/v1/students-andalucia";
        var dataEmployments = [];
        var dataStudents = [];
        var filteredEmployments = [];
        var filteredStudents = [];
        var dataIndustry = [];
        var dataBuilding = [];
        var dataServices = [];
        var dataESO = [];
        var dataHigh = [];
        var dataVocational = [];
       
       
        var year = "2017";
        
        refresh();
    
        function refresh() {
    
            $http.get(employmentsAPI).then(function(responseEmployments) {
                $http.get(studentsAPI).then(function(responseStudents) {
                    
                    dataEmployments = responseEmployments.data;
                    dataStudents = responseStudents.data;
                    
                    $scope.students = responseStudents.data;
                   
                    // Seleccionamos los recursos para el año dado
                    
                    filteredEmployments = dataEmployments  
                        .filter(function(d) {if(d.year == year) return d;});
                
                    filteredStudents = dataStudents
                        .filter(function(d) {if(d.year == parseInt(year)) return d;});
                  
                    filteredEmployments.forEach(function(d) {dataIndustry.push({"name":d.province, "value": d.industryEmployment})});
                    filteredEmployments.forEach(function(d) {dataBuilding.push({"name":d.province, "value": d.buildingEmployment})});
                    filteredEmployments.forEach(function(d) {dataServices.push({"name":d.province, "value": d.servicesEmployment})});
                    
                    filteredStudents.forEach(function(d) {dataESO.push({"name":d.city, "value": d.eso})});
                    filteredStudents.forEach(function(d) {dataHigh.push({"name":d.city, "value": d.high})});
                    filteredStudents.forEach(function(d) {dataVocational.push({"name":d.city, "value": d.vocational})});

                                        
                    Highcharts.chart('integration_SOS_05_container', {
                        chart: {
                            type: 'packedbubble',
                            height: '100%'
                        },
                        title: {
                            text: 'Comparative of employments and students in 2017'
                        },
                        tooltip: {
                            useHTML: true,
                            pointFormat: '<b>{point.name}:</b> {point.value}'
                        },
                        plotOptions: {
                            packedbubble: {
                                minSize: '20%',
                                maxSize: '100%',
                                zMin: 0,
                                zMax: 1000,
                                layoutAlgorithm: {
                                    gravitationalConstant: 0.05,
                                    splitSeries: true,
                                    seriesInteraction: false,
                                    dragBetweenSeries: true,
                                    parentNodeLimit: true
                                },
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}',
                                    filter: {
                                        property: 'y',
                                        operator: '>',
                                        value: 250
                                    },
                                    style: {
                                        color: 'black',
                                        textOutline: 'none',
                                        fontWeight: 'normal'
                                    }
                                }
                            }
                        },
                        series: [{
                            name: 'Industry Employments',
                            data: dataIndustry
                            }, {
                            name: 'Building Employments',
                            data: dataBuilding
                            }, {
                            name: 'Services Employments',
                            data: dataBuilding
                            }, {
                            name: 'ESO Students',
                            data: dataESO
                            }, {
                            name: 'High Students',
                            data: dataHigh  
                            }, {
                            name: 'Vocational Students',
                            data: dataVocational
                            }]
                    });
                });
            });
        }
    }]);   









      
                
/*                  
                    
                   Highcharts.chart('integration_SOS_05_container', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Comparative of employments and students in Seville'
                        },
                        xAxis: {
                            categories: dataChart.map(function(d) {return d.year})
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'employments / students (ud)'
                            },
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    color: ( // theme
                                        Highcharts.defaultOptions.title.style &&
                                        Highcharts.defaultOptions.title.style.color
                                    ) || 'gray'
                                }
                            }
                        },
                        legend: {
                            align: 'center',
                            x: 40,
                            verticalAlign: 'top',
                            y: 25,
                            floating: true,
                            backgroundColor:
                                Highcharts.defaultOptions.legend.backgroundColor || 'white',
                            borderColor: '#CCC',
                            borderWidth: 1,
                            shadow: false
                        },
                        tooltip: {
                            headerFormat: '<b>{point.x}</b><br/>',
                            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                        },
                        plotOptions: {
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        series: [{
                            name: 'Services',
                            data: dataChart.map(function(d) {return d.servicesEmployment})
                        }, {
                            name: 'Industry',
                            data: dataChart.map(function(d) {return d.industryEmployment})
                        }, {
                            name: 'Building',
                            data: dataChart.map(function(d) {return d.buildingEmployment})
                        }, {    
                            name: 'ESO',
                            data: dataChart.map(function(d) {return d.eso})
                        }, {
                            name: 'Bachillerato',
                            data: dataChart.map(function(d) {return d.high})
                        }, {
                            name: 'Universidad',
                            data: dataChart.map(function(d) {return d.vocational})
                        }]
                    });


*/
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
        var dataChart = [];
        var province = "sevilla";
        
        refresh();
    
        function refresh() {
    
            $http.get(employmentsAPI).then(function(responseEmployments) {
                $http.get(studentsAPI).then(function(responseStudents) {
                    
                    dataEmployments = responseEmployments.data;
                    dataStudents = responseStudents.data;
                    
                    $scope.students = responseStudents.data;
                   
                    // Seleccionamos los recursos de la provincia dada
                    
                    filteredEmployments = dataEmployments  
                        .filter(function(d) {if(d.province == province) return d;});
                    
                    filteredStudents = dataStudents
                        .filter(function(d) {if(d.city == province) return d;});
                    
                    // Creamos un array con los datos a representar 
                    
                    filteredStudents.forEach(function(d) {
                        filteredEmployments.forEach(function(e) {
                            if(d.year == parseInt(e.year))
                                dataChart.push({
                                    "year": d.year,
                                    "servicesEmployment": e.servicesEmployment,
                                    "industryEmployment": e.industryEmployment,
                                    "buildingEmployment": e.buildingEmployment,
                                    "eso": d.eso,
                                    "high": d.high,
                                    "vocational": d.vocational
                                });    
                            });
                        });
                    
                    console.log(dataChart);

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
                });
            });
        }
    }]);
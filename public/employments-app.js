/* global angular */

angular
    .module("EmploymentsApp",["ngRoute"])
    
    .config(function($routeProvider) {
        
        $routeProvider
                               
            .when("/ui/v1/province-employments",{
                controller: "ListEmploymentsCtrl",
                templateUrl: "province-employments-frontend/v1/list-employments.html"
                
            }).when("/ui/v1/province-employments/edit/:province/:year",{
                controller: "EditEmploymentsCtrl",
                templateUrl: "province-employments-frontend/v1/edit-employments.html"
        
			}).when("/", {
                templateUrl: "main.html"
						
			}).when("/analytics/highcharts",{
                controller: "HighchartsEmploymentsCtrl",
                templateUrl: "analytics/highcharts-employments.html"
    
            }).when("/analytics/geochart",{
                controller: "GeochartEmploymentsCtrl",
                templateUrl: "analytics/geochart-employments.html"
                
            }).when("/analytics/chartist",{
                controller: "ChartistEmploymentsCtrl",
                templateUrl: "analytics/chartist-employments.html"
                
            }).when("/integrations/employments-students", {
                controller: "EmploymentsStudentsCtrl",
                templateUrl: "integrations/employments-students.html"

            }).when("/integrations/employments-deceaseds", {
                controller: "EmploymentsDeceasedsCtrl",
                templateUrl: "integrations/employments-deceaseds.html"

            }).when("/integrations/weather", {
                controller: "WeatherCtrl",
                templateUrl: "integrations/weather-city.html"

            }).when("/integrations/coins", {
                controller: "CoinsCtrl",
                templateUrl: "integrations/coins.html"
			
			}).when("/about", {
                templateUrl: "about.html"
			
            });
        });
            
    console.log("Employments App Initialized!");
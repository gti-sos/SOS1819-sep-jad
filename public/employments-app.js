/* global angular */

angular
    .module("EmploymentsApp",["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "index.html"
                
            }).when("/ui/v1/province-employments",{
                controller: "ListEmploymentsCtrl",
                templateUrl: "province-employments-frontend/v1/list-employments.html"
                
            }).when("/ui/v1/province-employments/edit/:province/:year",{
                controller: "EditEmploymentsCtrl",
                templateUrl: "province-employments-frontend/v1/edit-employments.html"
                
            });
    });
            
console.log("Employments App Initialized!");
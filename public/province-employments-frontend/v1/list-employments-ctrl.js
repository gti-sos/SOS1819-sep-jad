/* global angular */

angular
    .module("EmploymentsApp")
    .controller("ListEmploymentsCtrl",["$scope","$http", function ($scope,$http){
        console.log("List controller initialized");
        var API = "/api/v1/province-employments";
        
        
    }]);
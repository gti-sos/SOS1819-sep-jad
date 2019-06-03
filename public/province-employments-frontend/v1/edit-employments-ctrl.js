/* global angular */

angular
    .module("EmploymentsApp")
    .controller("EditEmploymentsCtrl",["$scope","$http", function ($scope,$http){
        console.log("Edit controller initialized");
        var API = "/api/v1/province-employments";
        

}]);
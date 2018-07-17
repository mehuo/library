'use strict';

var module = angular.module('app.controllers');

module.controller('fileCtrl', function($scope, $element, $http) {
    $scope.menus = nav;
    $scope.fileList = tech_file_list;
    $scope.themesList = $scope.fileList[0].themes;
    buildFileName();

    $scope.openThis = function(item){
        $scope.themesList = item.themes;
        buildFileName();
    }

    function buildFileName(){
        angular.forEach($scope.themesList,function(v,k){
            angular.forEach(v.file,function(value,key){
                var list  = value.address.split('/');
                value.fileName = list[list.length-1];
            })
        })
    }

})
'use strict';

var module = angular.module('app.controllers');

module.controller('index', function($scope, $element, $http) {
    //从menu.js中获取顶部导航数据
    $scope.menus = nav;

})
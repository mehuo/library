'use strict';

var module = angular.module('app.directives');
module.directive('menuNav', function() {
    return {
        restrict: 'EA',
        templateUrl: '/source/index/partials/menuNav.html',
        replace: true,
        scope: {
            menus: '='
        },
        controller: function($scope, $element) {
            $scope.openDrop = function(e) {
                var dropMenu = $(e.target).children(".dropdown-menu")[0];
                $(dropMenu).show();
            }
            $scope.closeDrop = function(e) {
                var dropMenu = $(e.target).children(".dropdown-menu")[0];
                $(dropMenu).hide();
            }
        }
    }
})